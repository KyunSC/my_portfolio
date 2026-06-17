"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { EXPERIENCES } from "@/lib/data";

interface ExperienceTerminalProps {
  experiences: typeof EXPERIENCES;
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

const lineVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0 },
};

export default function ExperienceTerminal({ experiences }: ExperienceTerminalProps) {
  const shouldReduceMotion = useReducedMotion();

  // Flatten every experience into terminal lines so they reveal in sequence.
  const blocks = experiences.map((exp, i) => {
    const hash = commitHash(`${exp.company}-${exp.role}`);
    const lines: { text: string; className: string }[] = [];
    lines.push({
      text: `commit ${hash}${i === 0 ? "  (HEAD -> main)" : ""}`,
      className: "text-yellow-500",
    });
    lines.push({ text: `Author: Sunny Chen`, className: "text-zinc-400" });
    lines.push({ text: `Date:   ${exp.period}`, className: "text-zinc-400" });
    lines.push({ text: "", className: "" });
    lines.push({
      text: `    ${exp.role} @ ${exp.company}${exp.location ? ` · ${exp.location}` : ""}`,
      className: "text-zinc-100 font-semibold",
    });
    lines.push({ text: "", className: "" });
    for (const d of exp.description.split("\n")) {
      lines.push({ text: `    ${d}`, className: "text-zinc-300" });
    }
    lines.push({ text: "", className: "" });
    lines.push({
      text: `    tags: ${exp.tags.join("  ")}`,
      className: "text-primary",
    });
    return lines;
  });

  // Single flat list with a leading prompt line.
  const allLines = [
    { text: "$ git log --work-experience", className: "text-zinc-100", prompt: true },
    { text: "", className: "" },
    ...blocks.flatMap((b, i) => (i < blocks.length - 1 ? [...b, { text: "", className: "" }] : b)),
  ];

  return (
    <Card className="overflow-hidden bg-zinc-950 border-zinc-800 font-mono text-sm">
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
      <motion.div
        className="space-y-0.5 overflow-x-auto p-4 text-zinc-300"
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.04 }}
      >
        {allLines.map((line, i) => (
          <motion.p
            key={i}
            variants={shouldReduceMotion ? undefined : lineVariants}
            className={`whitespace-pre ${line.className} ${line.text === "" ? "h-3" : ""}`}
          >
            {"prompt" in line && line.prompt ? (
              <>
                <span className="text-primary">$</span>
                {line.text.slice(1)}
              </>
            ) : (
              line.text
            )}
          </motion.p>
        ))}
        {/* Blinking prompt at the end */}
        <p className="flex items-center">
          <span className="text-primary">$</span>
          <span className="terminal-cursor ml-2 inline-block h-[1em] w-2 bg-green-400 align-middle" />
        </p>
      </motion.div>
    </Card>
  );
}
