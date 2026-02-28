"use client";

import dynamic from "next/dynamic";

const TerminalBio = dynamic(() => import("@/components/TerminalBio"), {
  ssr: false,
  loading: () => (
    <div className="h-[340px] rounded-lg bg-zinc-950 border border-zinc-800 animate-pulse" />
  ),
});

export default function LazyTerminalBio() {
  return <TerminalBio />;
}
