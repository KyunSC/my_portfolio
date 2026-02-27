"use client";

import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";

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

export default function TerminalBio() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory(INITIAL_HISTORY);
      setInput("");
      return;
    }

    const output = COMMANDS[cmd] ?? [
      `command not found: ${cmd}. Type 'help' for available commands.`,
    ];

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  }

  return (
    <Card
      className="overflow-hidden bg-zinc-950 border-zinc-800 font-mono text-sm mb-6 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="p-4 space-y-1 text-zinc-300 max-h-72 overflow-y-auto">
        {history.map((entry, i) => (
          <div key={i} className="space-y-1">
            <p>
              <span className="text-primary">$</span>{" "}
              <span className="text-zinc-400">{entry.command}</span>
            </p>
            {entry.output.map((line, j) => (
              <p key={j} className="text-zinc-200 whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-primary">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-zinc-200 outline-none caret-primary"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>

        <div />
      </div>
    </Card>
  );
}
