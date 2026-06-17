"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Card } from "@/components/ui/card";
import type { EXPERIENCES } from "@/lib/data";

interface ExperienceTerminalProps {
  experiences: typeof EXPERIENCES;
}

interface HistoryEntry {
  command: string;
  output: string[];
}

// Deterministic 7-char hex "commit hash" derived from the entry, so SSR and
// client render the same value (no hydration mismatch).
function commitHash(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const getServerSnapshot = () => false;

export default function ExperienceTerminal({ experiences }: ExperienceTerminalProps) {
  // Build all command outputs from the experiences data.
  const { fullLog, oneline, lsList, helpLines } = useMemo(() => {
    const fullLog: string[] = [];
    experiences.forEach((exp, i) => {
      const hash = commitHash(`${exp.company}-${exp.role}`);
      fullLog.push(`commit ${hash}${i === 0 ? "  (HEAD -> main)" : ""}`);
      fullLog.push("Author: Sunny Chen");
      fullLog.push(`Date:   ${exp.period}`);
      fullLog.push("");
      fullLog.push(`    ${exp.role} @ ${exp.company}${exp.location ? ` · ${exp.location}` : ""}`);
      fullLog.push("");
      for (const d of exp.description.split("\n")) fullLog.push(`    ${d}`);
      fullLog.push("");
      fullLog.push(`    tags: ${exp.tags.join("  ")}`);
      if (i < experiences.length - 1) fullLog.push("");
    });

    const oneline = experiences.map(
      (exp) => `${commitHash(`${exp.company}-${exp.role}`)} ${exp.role} @ ${exp.company}`
    );

    const lsList = experiences.map(
      (exp) => `${exp.company.toLowerCase().replace(/\s+/g, "-")}/   ${exp.role}`
    );

    const helpLines = [
      "Available commands:",
      "  git log              — full work history",
      "  git log --oneline    — compact history",
      "  ls                   — list companies",
      "  whoami               — who am I?",
      "  clear                — clear the terminal",
      "  help                 — show this message",
    ];

    return { fullLog, oneline, lsList, helpLines };
  }, [experiences]);

  const initialHistory = useMemo<HistoryEntry[]>(
    () => [{ command: "git log --work-experience", output: fullLog }],
    [fullLog]
  );

  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // Auto-scroll to the latest output (skip first mount).
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const runCommand = useCallback(
    (raw: string): string[] | "clear" => {
      const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
      if (!cmd) return [];
      if (cmd === "clear") return "clear";
      if (cmd === "help") return helpLines;
      if (cmd === "whoami") return ["sunny-chen"];
      if (cmd === "ls") return lsList;
      if (cmd === "git log --oneline") return oneline;
      if (cmd === "git log" || cmd === "git log --work-experience") return fullLog;
      return [`command not found: ${raw.trim()}. Type 'help' for available commands.`];
    },
    [helpLines, lsList, oneline, fullLog]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const result = runCommand(input);
      if (result === "clear") {
        setHistory([]);
      } else {
        setHistory((prev) => [...prev, { command: input.trim(), output: result }]);
      }
      setInput("");
      setHistoryIndex(-1);
    },
    [input, runCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
    },
    [history, historyIndex]
  );

  return (
    <Card
      className="flex h-[440px] flex-col overflow-hidden border-zinc-800 bg-zinc-950 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-zinc-400">sunny@portfolio: ~/career</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 cursor-text space-y-1 overflow-y-auto p-4 text-zinc-300">
        {history.map((entry, i) => (
          <div key={i} className="space-y-0.5">
            <p>
              <span className="text-primary">$</span>{" "}
              <span className="text-zinc-400">{entry.command}</span>
            </p>
            {entry.output.map((line, j) => (
              <p
                key={j}
                className={`overflow-x-auto whitespace-pre ${
                  line.startsWith("commit ")
                    ? "text-yellow-500"
                    : line.startsWith("    tags:")
                      ? "text-primary"
                      : "text-zinc-200"
                } ${line === "" ? "h-3" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
          <span className="text-primary">$</span>
          <div className="relative flex flex-1 items-center">
            <span className="whitespace-pre text-zinc-200">{input}</span>
            <span
              className={`terminal-cursor ml-px inline-block h-[1em] w-2 bg-green-400 align-middle${
                focused || prefersReducedMotion ? "" : " opacity-0"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="absolute inset-0 w-full opacity-0"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </form>
      </div>
    </Card>
  );
}
