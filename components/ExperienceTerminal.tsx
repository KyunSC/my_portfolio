"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Prompt, TerminalInput, TerminalWindow } from "@/components/TerminalWindow";
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
      const links = "links" in exp ? (exp.links as string[] | undefined) : undefined;
      if (links?.length) {
        for (const url of links) fullLog.push(`    link: ${url}`);
      }
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

  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [input, setInput] = useState("");
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
      return [`zsh: command not found: ${raw.trim().split(/\s+/)[0]}`, "(type 'help' for available commands)"];
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
    <TerminalWindow
      title="career"
      bodyRef={bodyRef}
      onActivate={() => inputRef.current?.focus()}
      className="h-[560px] md:h-[640px]"
      bodyClassName="break-words [word-break:normal] md:text-[15px] md:leading-[21px]"
    >
      {history.map((entry, i) => (
        <div key={i}>
          <p>
            <Prompt dir="career" />
            {entry.command}
          </p>
          {entry.output.map((line, j) => {
            const linkMatch = line.match(/^(\s*link: )(\S+)$/);
            if (linkMatch) {
              return (
                <p key={j}>
                  {linkMatch[1]}
                  <a
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:decoration-cyan-400"
                  >
                    {linkMatch[2]}
                  </a>
                </p>
              );
            }
            return (
              <p
                key={j}
                className={
                  line.startsWith("commit ")
                    ? "text-yellow-400"
                    : line.startsWith("    tags:")
                      ? "text-green-400"
                      : undefined
                }
              >
                {line || "\u00a0"}
              </p>
            );
          })}
        </div>
      ))}

      {/* Input line */}
      <form onSubmit={handleSubmit} className="relative">
        <Prompt dir="career" />
        <TerminalInput value={input} onChange={setInput} onKeyDown={handleKeyDown} inputRef={inputRef} />
      </form>
    </TerminalWindow>
  );
}
