"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { useWeather, type WeatherData } from "@/components/WeatherProvider";
import { Prompt, TerminalInput, TerminalWindow } from "@/components/TerminalWindow";

/* ── Output lines: plain text, or styled segments ── */

interface Segment {
  text: string;
  className?: string;
  href?: string;
}
type Line = string | Segment[];

const lineText = (line: Line) => (typeof line === "string" ? line : line.map((s) => s.text).join(""));

/* ── A tiny home directory ── */

const USER = "sunny-chen";
const HOME = `/Users/${USER}`;

type FsNode =
  | { type: "dir"; mtime: string; children: Record<string, FsNode> }
  | { type: "file"; mtime: string; lines: Line[] };

const dir = (mtime: string, children: Record<string, FsNode>): FsNode => ({ type: "dir", mtime, children });
const file = (mtime: string, lines: Line[]): FsNode => ({ type: "file", mtime, lines });

const ALIASES: Record<string, string> = {
  about: "cat ~/about.txt",
  skills: "cat ~/skills.txt",
  projects: "cat ~/projects/README.md",
  contact: "cat ~/contact.txt",
};

const link = (text: string, href: string): Segment => ({ text, href });

const FS = dir("Oct  3 21:14", {
  ".zshrc": file("Sep 14 10:02", [
    'export ZSH="$HOME/.oh-my-zsh"',
    'ZSH_THEME="robbyrussell"',
    "plugins=(git)",
    "source $ZSH/oh-my-zsh.sh",
    "",
    ...Object.entries(ALIASES).map(([name, cmd]) => `alias ${name}="${cmd}"`),
  ]),
  "about.txt": file("Oct  3 21:14", [
    "Software Engineering Co-op @ McGill, based in Montreal",
    "Passionate about building impactful products and finance",
    "Currently building: Options Market Analytics Engine",
    "Open to: Internship & co-op opportunities",
  ]),
  "contact.txt": file("Sep 20 16:48", [
    [{ text: "Email:    " }, link("sunny.chen@mail.mcgill.ca", "mailto:sunny.chen@mail.mcgill.ca")],
    [{ text: "GitHub:   " }, link("github.com/KyunSC", "https://github.com/KyunSC")],
    [{ text: "LinkedIn: " }, link("linkedin.com/in/sunny-chen-software", "https://linkedin.com/in/sunny-chen-software")],
  ]),
  "skills.txt": file("Sep 28 14:02", [
    "Languages:  TypeScript, JavaScript, C#, Python, Java, SQL, C, Bash",
    "Frameworks: React, Next.js, Node.js, .NET, Angular, Spring Boot",
    "ML:         PyTorch, scikit-learn",
    "Tools:      Git, Docker, PostgreSQL, MySQL, Azure, Linux",
  ]),
  projects: dir("Oct  1 19:37", {
    "README.md": file("Oct  1 19:37", [
      "Options Market Analytics Engine — Live options analytics on Azure",
      [{ text: "  → " }, link("github.com/KyunSC/azure-market-data", "https://github.com/KyunSC/azure-market-data")],
      "CrowdCheck — Real-time crowd tracker for McGill gyms & libraries",
      [{ text: "  → " }, link("github.com/KyunSC/crowd-check", "https://github.com/KyunSC/crowd-check")],
    ]),
    "azure-market-data": dir("Oct  1 19:30", {
      "README.md": file("Oct  1 19:30", [
        "# Options Market Analytics Engine",
        "Live options analytics on Azure",
        [link("https://github.com/KyunSC/azure-market-data", "https://github.com/KyunSC/azure-market-data")],
      ]),
    }),
    "crowd-check": dir("Aug 22 11:05", {
      "README.md": file("Aug 22 11:05", [
        "# CrowdCheck",
        "Real-time crowd tracker for McGill gyms & libraries",
        [link("https://github.com/KyunSC/crowd-check", "https://github.com/KyunSC/crowd-check")],
      ]),
    }),
  }),
});

/** Resolve a path argument against the cwd. Paths are segment lists relative to $HOME. */
function resolvePath(cwd: string[], arg: string): string[] | null {
  let rest = arg;
  let parts: string[];
  if (rest === "~" || rest.startsWith("~/")) {
    parts = [];
    rest = rest.slice(1);
  } else if (rest === HOME || rest.startsWith(`${HOME}/`)) {
    parts = [];
    rest = rest.slice(HOME.length);
  } else if (rest.startsWith("/")) {
    return null; // Only the home directory is modelled
  } else {
    parts = [...cwd];
  }
  for (const seg of rest.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts;
}

function lookup(path: string[] | null): FsNode | undefined {
  if (!path) return undefined;
  let node: FsNode | undefined = FS;
  for (const seg of path) {
    if (node?.type !== "dir") return undefined;
    node = node.children[seg];
  }
  return node;
}

const nodeSize = (node: FsNode) =>
  node.type === "dir"
    ? 64 + 32 * Object.keys(node.children).length
    : node.lines.reduce<number>((n, l) => n + lineText(l).length + 1, 0);

const dirLabel = (cwd: string[]) => (cwd.length ? cwd[cwd.length - 1] : "~");

/* ── Dates in macOS format ── */

const pad2 = (n: number) => String(n).padStart(2, "0");

function formatDate(d: Date, withZone = false) {
  const weekday = d.toLocaleString("en-US", { weekday: "short" });
  const month = d.toLocaleString("en-US", { month: "short" });
  const time = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  const base = `${weekday} ${month} ${String(d.getDate()).padStart(2, " ")} ${time}`;
  if (!withZone) return base;
  const zone = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;
  return `${base} ${zone ?? ""} ${d.getFullYear()}`;
}

/* ── Shell ── */

interface Entry {
  dir: string;
  /** Exit status of the previous command — colours this prompt's arrow. */
  status: number;
  command: string;
  output: Line[];
}

interface Session {
  banner: string | null;
  entries: Entry[];
  cwd: string[];
  status: number;
  history: string[];
  exited: boolean;
}

interface Context {
  cwd: string[];
  status: number;
  history: string[];
  weather: WeatherData | null;
}

interface Result {
  output?: Line[];
  status?: number;
  cwd?: string[];
  clear?: boolean;
  exit?: boolean;
}

const err = (message: string, status = 1): Result => ({ output: [message], status });

const COMMANDS: Record<string, (args: string[], ctx: Context) => Result> = {
  help: () => ({
    output: [
      "Try one of these:",
      "  about       cat ~/about.txt",
      "  skills      cat ~/skills.txt",
      "  projects    cat ~/projects/README.md",
      "  contact     cat ~/contact.txt",
      "  weather     is it Sunny outside?",
      "",
      "Also: ls, cd, cat, pwd, echo, date, history, clear, exit",
    ],
  }),
  whoami: () => ({ output: [USER] }),
  pwd: (_, { cwd }) => ({ output: [[HOME, ...cwd].join("/")] }),
  date: () => ({ output: [formatDate(new Date(), true)] }),
  uname: () => ({ output: ["Darwin"] }),
  clear: () => ({ clear: true }),
  alias: () => ({ output: Object.entries(ALIASES).map(([name, cmd]) => `${name}='${cmd}'`) }),
  history: (_, { history }) => ({
    output: history.map((cmd, i) => `${String(i + 1).padStart(5)}  ${cmd}`),
  }),
  echo: (args, { cwd, status }) => {
    const vars: Record<string, string> = {
      USER,
      HOME,
      SHELL: "/bin/zsh",
      PWD: [HOME, ...cwd].join("/"),
      "?": String(status),
    };
    return { output: [args.join(" ").replace(/\$(\?|[A-Z_]+)/g, (_, name: string) => vars[name] ?? "")] };
  },
  cd: (args, { cwd }) => {
    const target = args[0] ?? "~";
    const path = resolvePath(cwd, target);
    const node = lookup(path);
    if (!node) return err(`cd: no such file or directory: ${target}`);
    if (node.type !== "dir") return err(`cd: not a directory: ${target}`);
    return { cwd: path! };
  },
  cat: (args, { cwd }) => {
    const output: Line[] = [];
    let status = 0;
    for (const arg of args) {
      const node = lookup(resolvePath(cwd, arg));
      if (!node) {
        output.push(`cat: ${arg}: No such file or directory`);
        status = 1;
      } else if (node.type === "dir") {
        output.push(`cat: ${arg}: Is a directory`);
        status = 1;
      } else {
        output.push(...node.lines);
      }
    }
    return { output, status };
  },
  ls: (args, { cwd }) => {
    const flags = args.filter((a) => a.startsWith("-")).join("");
    const target = args.find((a) => !a.startsWith("-")) ?? ".";
    const node = lookup(resolvePath(cwd, target));
    if (!node) return err(`ls: ${target}: No such file or directory`);
    if (node.type === "file") return { output: [target] };

    const all = flags.includes("a");
    const items: [string, FsNode][] = [
      ...(all ? ([[".", node], ["..", node]] as [string, FsNode][]) : []),
      ...Object.entries(node.children)
        .filter(([name]) => all || !name.startsWith("."))
        .sort(([a], [b]) => a.localeCompare(b)),
    ];
    const styled = (name: string, n: FsNode): Segment =>
      n.type === "dir" ? { text: name, className: "font-bold text-blue-400" } : { text: name };

    if (flags.includes("l")) {
      const total = items.reduce((n, [, child]) => n + Math.ceil(nodeSize(child) / 512), 0);
      const sizeWidth = Math.max(...items.map(([, child]) => String(nodeSize(child)).length));
      return {
        output: [
          `total ${total}`,
          ...items.map(([name, child]): Line => {
            const isDir = child.type === "dir";
            const meta = [
              isDir ? "drwxr-xr-x" : "-rw-r--r--",
              String(isDir ? Object.keys(child.children).length + 2 : 1).padStart(3),
              `${USER}  staff`,
              String(nodeSize(child)).padStart(sizeWidth + 1),
              child.mtime,
            ].join(" ");
            return [{ text: `${meta} ` }, styled(name, child)];
          }),
        ],
      };
    }

    const width = Math.max(...items.map(([name]) => name.length)) + 2;
    return {
      output: items.length
        ? [items.map(([name, child], i) => {
            const seg = styled(name, child);
            return i < items.length - 1 ? { ...seg, text: name.padEnd(width) } : seg;
          })]
        : [],
    };
  },
  weather: (_, { weather }) => {
    if (!weather || weather.temperature === null) {
      return { output: ["Could not fetch weather data. But trust me, it's always Sunny here."] };
    }
    const city = weather.city ?? "Montreal";
    return {
      output: [
        `Current weather in ${city}: ${weather.description}, ${weather.temperature}°C`,
        weather.isSunny ? "Sunny confirmed. ✓" : "Not sunny outside... but always Sunny in this terminal.",
      ],
    };
  },
  sudo: () => err(`${USER} is not in the sudoers file.  This incident will be reported.`),
  exit: () => ({
    exit: true,
    output: [
      "",
      "Saving session...",
      "...saving history...truncating history files...",
      "...completed.",
      "",
      "[Process completed]",
    ],
  }),
};

const COMMAND_NAMES = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)].sort();

/** Split on whitespace, honouring simple single/double quotes. */
function tokenize(input: string): string[] {
  return [...input.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3]);
}

function execute(session: Session, raw: string, weather: WeatherData | null): Session {
  const entry: Entry = { dir: dirLabel(session.cwd), status: session.status, command: raw, output: [] };
  const trimmed = raw.trim();
  if (!trimmed) return { ...session, entries: [...session.entries, entry] };

  const [first, ...rest] = trimmed.split(/\s+/);
  const expanded = ALIASES[first] ? [ALIASES[first], ...rest].join(" ") : trimmed;
  const [name, ...args] = tokenize(expanded);
  const command = COMMANDS[name.toLowerCase()];

  const result: Result = command
    ? command(args, { cwd: session.cwd, status: session.status, history: session.history, weather })
    : {
        status: 127,
        output: [
          `zsh: command not found: ${name}`,
          [{ text: "(type 'help' to see what's here)", className: "text-zinc-500" }],
        ],
      };

  const history = [...session.history, trimmed];
  if (result.clear) return { ...session, banner: null, entries: [], status: 0, history };

  return {
    ...session,
    entries: [...session.entries, { ...entry, output: result.output ?? [] }],
    cwd: result.cwd ?? session.cwd,
    status: result.status ?? 0,
    history,
    exited: !!result.exit,
  };
}

/** Tab completion: command names for the first word, paths after that. */
function complete(input: string, cwd: string[]): string | null {
  const [, head, word] = input.match(/^(.*?)(\S*)$/)!;
  let candidates: string[];

  if (!head.trim()) {
    candidates = COMMAND_NAMES.filter((n) => n.startsWith(word)).map((n) => `${n} `);
  } else {
    const slash = word.lastIndexOf("/");
    const dirPart = word.slice(0, slash + 1);
    const namePart = word.slice(slash + 1);
    const node = lookup(resolvePath(cwd, dirPart || "."));
    if (node?.type !== "dir") return null;
    candidates = Object.entries(node.children)
      .filter(([n]) => n.startsWith(namePart) && (namePart.startsWith(".") || !n.startsWith(".")))
      .map(([n, child]) => `${dirPart}${n}${child.type === "dir" ? "/" : " "}`);
  }

  if (candidates.length === 0) return null;
  if (candidates.length === 1) return head + candidates[0];
  let prefix = candidates[0];
  for (const c of candidates) while (!c.startsWith(prefix)) prefix = prefix.slice(0, -1);
  return prefix.length > word.length ? head + prefix : null;
}

/* ── Session lifecycle ── */

const BOOT_COMMANDS = ["whoami", "cat about.txt"];

function newSession(history: string[] = []): Session {
  // A plausible "Last login" a few hours ago
  const lastLogin = new Date(Date.now() - (2 + Math.random() * 5) * 3_600_000);
  return {
    banner: `Last login: ${formatDate(lastLogin)} on ttys000`,
    entries: [],
    cwd: [],
    status: 0,
    history,
    exited: false,
  };
}

const runBoot = (session: Session): Session =>
  BOOT_COMMANDS.reduce<Session>((s, cmd) => execute(s, cmd, null), { ...session, entries: [], history: [] });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Human-ish keystroke timing: uneven, with a beat after spaces. */
const keystrokeDelay = (char: string) => 55 + Math.random() * 85 + (char === " " ? 90 : 0);

/* ── Rendering ── */

function renderLine(line: Line) {
  if (typeof line === "string") return line || " ";
  return line.map((seg, i) =>
    seg.href ? (
      <a
        key={i}
        href={seg.href}
        target={seg.href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="underline decoration-zinc-600 underline-offset-2 hover:decoration-zinc-300"
      >
        {seg.text}
      </a>
    ) : (
      <span key={i} className={seg.className}>
        {seg.text}
      </span>
    )
  );
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const getServerSnapshot = () => false;

const MODIFIER_KEYS = new Set(["Shift", "Control", "Alt", "Meta", "CapsLock"]);

export default function TerminalBio() {
  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { weather } = useWeather();

  const [session, setSession] = useState<Session>(() =>
    prefersReducedMotion ? runBoot(newSession()) : newSession()
  );
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(() => !prefersReducedMotion);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const skipBootRef = useRef<() => void>(() => {});

  // Scripted intro: someone types a couple of commands (skipped for reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    let cancelled = false;

    skipBootRef.current = () => {
      cancelled = true;
      setSession(runBoot);
      setInput("");
      setBooting(false);
    };

    (async () => {
      await sleep(900);
      for (const cmd of BOOT_COMMANDS) {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setInput(cmd.slice(0, i));
          await sleep(keystrokeDelay(cmd[i - 1]));
        }
        await sleep(350);
        if (cancelled) return;
        setSession((s) => execute(s, cmd, null));
        setInput("");
        await sleep(650);
      }
      if (!cancelled) setBooting(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion]);

  // Typing or new output snaps back to the bottom, like a real terminal
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [session, input]);

  const resetLine = () => {
    setInput("");
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (booting) return;
    setSession(execute(session, input, weather));
    resetLine();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (booting) {
      // Any keypress fast-forwards the intro
      if (MODIFIER_KEYS.has(e.key)) return;
      e.preventDefault();
      skipBootRef.current();
      return;
    }

    if (e.ctrlKey && !e.metaKey && !e.altKey) {
      const key = e.key.toLowerCase();
      if (key === "c") {
        e.preventDefault();
        setSession((s) => ({
          ...s,
          entries: [...s.entries, { dir: dirLabel(s.cwd), status: s.status, command: `${input}^C`, output: [] }],
          status: 130,
        }));
        resetLine();
      } else if (key === "l") {
        e.preventDefault();
        setSession((s) => ({ ...s, banner: null, entries: [] }));
      } else if (key === "u") {
        e.preventDefault();
        setInput("");
      }
      return;
    }

    // Tab completes; on an empty line it still moves focus so keyboard users aren't trapped
    if (e.key === "Tab" && !e.shiftKey && input) {
      e.preventDefault();
      const completed = complete(input, session.cwd);
      if (completed !== null) setInput(completed);
      return;
    }

    const past = session.history;
    if (past.length === 0) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, past.length - 1);
      setHistoryIndex(next);
      setInput(past[past.length - 1 - next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        resetLine();
      } else {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(past[past.length - 1 - next]);
      }
    }
  };

  const handleActivate = () => {
    if (session.exited) {
      // Like pressing a key in a closed Terminal tab: start a fresh login shell
      setSession(newSession(session.history));
      resetLine();
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    inputRef.current?.focus();
  };

  return (
    <TerminalWindow
      title={session.cwd.length ? session.cwd[session.cwd.length - 1] : USER}
      bodyRef={bodyRef}
      onActivate={handleActivate}
      className="mb-6 h-[340px]"
    >
      {session.banner && <p>{session.banner}</p>}

      {session.entries.map((entry, i) => (
        <div key={i}>
          <p>
            <Prompt dir={entry.dir} ok={entry.status === 0} />
            {entry.command}
          </p>
          {entry.output.map((line, j) => (
            <p key={j}>{renderLine(line)}</p>
          ))}
        </div>
      ))}

      {!session.exited && (
        <form onSubmit={handleSubmit} className="relative">
          <Prompt dir={dirLabel(session.cwd)} ok={session.status === 0} />
          <TerminalInput
            value={input}
            onChange={(value) => !booting && setInput(value)}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            forceActive={booting}
          />
        </form>
      )}
    </TerminalWindow>
  );
}
