"use client";

import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { useWeather } from "@/components/WeatherProvider";

interface HistoryEntry {
  command: string;
  output: string[];
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami      — who am I?",
    "  about       — read about me",
    "  skills      — list my skills",
    "  projects    — see what I'm building",
    "  contact     — how to reach me",
    "  weather     — is it Sunny outside?",
    "  clear       — clear the terminal",
    "  help        — show this message",
  ],
  whoami: ["sunny-chen"],
  about: [
    "> Software developer based in Montreal",
    "> Passionate about building impactful products and finance",
    "> Currently building: CrowdCheck",
    "> Open to: Full-time & internship opportunities",
  ],
  skills: [
    "Languages:  TypeScript, Python, Java, C++",
    "Frontend:   React, Next.js, Tailwind CSS",
    "Backend:    Node.js, Express, Flask",
    "Tools:      Git, Docker, PostgreSQL, Firebase",
  ],
  projects: [
    "CrowdCheck — Real-time crowd density platform",
    "  → crowdcheck.live",
  ],
  contact: [
    "Email:    sunnychen.dev@gmail.com",
    "GitHub:   github.com/sunnychen315",
    "LinkedIn: linkedin.com/in/sunny-chen-mtl",
  ],
};

const INITIAL_HISTORY: HistoryEntry[] = [
  { command: "whoami", output: ["sunny-chen"] },
  {
    command: "cat about.txt",
    output: [
      "> Software developer based in Montreal",
      "> Passionate about building impactful products and finance",
      "> Currently building: CrowdCheck",
      "> Open to: Full-time & internship opportunities",
    ],
  },
];

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const getServerSnapshot = () => false;

export default function TerminalBio() {
  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { weather } = useWeather();

  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    prefersReducedMotion ? INITIAL_HISTORY : []
  );
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(() => !prefersReducedMotion);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Typewriter effect on mount (skipped if user prefers reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    const entries = INITIAL_HISTORY;
    let builtHistory: HistoryEntry[] = [];

    async function sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms));
    }

    async function typeEntries() {
      for (let ei = 0; ei < entries.length; ei++) {
        if (cancelled) return;
        const entry = entries[ei];

        // Type command character by character
        for (let ci = 0; ci <= entry.command.length; ci++) {
          if (cancelled) return;
          const partial = entry.command.slice(0, ci);
          setHistory([
            ...builtHistory,
            { command: partial, output: [] },
          ]);
          await sleep(35);
        }

        // Small pause before output
        await sleep(150);

        // Reveal output lines one at a time
        for (let li = 1; li <= entry.output.length; li++) {
          if (cancelled) return;
          setHistory([
            ...builtHistory,
            { command: entry.command, output: entry.output.slice(0, li) },
          ]);
          await sleep(60);
        }

        builtHistory = [
          ...builtHistory,
          { command: entry.command, output: entry.output },
        ];

        // Pause between entries
        if (ei < entries.length - 1) await sleep(300);
      }

      if (!cancelled) setIsTyping(false);
    }

    typeEntries();
    return () => { cancelled = true; };
  }, [prefersReducedMotion]);

  // Auto-scroll on history change (skip first mount)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory(INITIAL_HISTORY);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    if (cmd === "weather") {
      const lines: string[] = [];
      if (weather && weather.temperature !== null) {
        lines.push(`Current weather in Montreal: ${weather.description}, ${weather.temperature}°C`);
        if (weather.isSunny) {
          lines.push("Sunny confirmed. ✓");
        } else {
          lines.push("Not sunny outside... but always Sunny in this terminal.");
        }
      } else {
        lines.push("Could not fetch weather data. But trust me, it's always Sunny here.");
      }
      setHistory((prev) => [...prev, { command: cmd, output: lines }]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    const output = COMMANDS[cmd] ?? [
      `command not found: ${cmd}. Type 'help' for available commands.`,
    ];

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
    setHistoryIndex(-1);
  }, [input, isTyping, weather]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const pastCommands = history.map((entry) => entry.command);
    if (pastCommands.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = historyIndex < pastCommands.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(pastCommands[pastCommands.length - 1 - nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(pastCommands[pastCommands.length - 1 - nextIndex]);
      }
    }
  }, [history, historyIndex]);

  return (
    <Card
      className="overflow-hidden bg-zinc-950 border-zinc-800 font-mono text-sm mb-6 h-[340px] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="group/red relative h-3 w-3 rounded-full bg-red-500 flex items-center justify-center cursor-pointer">
            <span className="absolute text-[8px] font-bold leading-none text-red-900 opacity-0 group-hover/red:opacity-100 transition-opacity">✕</span>
          </span>
          <span className="group/yellow relative h-3 w-3 rounded-full bg-yellow-500 flex items-center justify-center cursor-pointer">
            <span className="absolute text-[8px] font-bold leading-none text-yellow-900 opacity-0 group-hover/yellow:opacity-100 transition-opacity">−</span>
          </span>
          <span className="group/green relative h-3 w-3 rounded-full bg-green-500 flex items-center justify-center cursor-pointer">
            <svg
              width="8" height="8" viewBox="0 0 8 8"
              className="absolute opacity-0 group-hover/green:opacity-100 transition-opacity"
              fill="#14532d"
            >
              <polygon points="4,0 0,4 4,4" />
              <polygon points="4,8 8,4 4,4" />
            </svg>
          </span>
        </div>
        <span className="ml-2 text-xs text-zinc-400">terminal</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="p-4 space-y-1 text-zinc-300 flex-1 overflow-y-auto cursor-text">
        {history.map((entry, i) => (
          <div key={i} className="space-y-1">
            <p>
              <span className="text-primary">$</span>{" "}
              <span className="text-zinc-400">{entry.command}</span>
              {/* Show blinking cursor at end of currently-typing command */}
              {isTyping && i === history.length - 1 && entry.output.length === 0 && (
                <span className="inline-block w-2 h-[1em] bg-green-400 ml-px align-middle terminal-cursor" />
              )}
            </p>
            {entry.output.map((line, j) => (
              <p key={j} className="text-zinc-200 whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        ))}

        {/* Input line — hidden while typewriter is active */}
        {!isTyping && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-primary">$</span>
            <div className="relative flex-1 flex items-center">
              {/* Visible text + cursor */}
              <span className="text-zinc-200 whitespace-pre">{input}</span>
              <span
                className={`inline-block w-2 h-[1em] bg-green-400 ml-px align-middle terminal-cursor${focused ? "" : " opacity-0"}`}
              />
              {/* Hidden input captures keystrokes */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="absolute inset-0 opacity-0 w-full"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </form>
        )}

        <div />
      </div>
    </Card>
  );
}
