"use client";

import dynamic from "next/dynamic";

const TerminalBio = dynamic(() => import("@/components/TerminalBio"), {
  ssr: false,
  loading: () => (
    <div className="mb-6 h-[340px] overflow-hidden rounded-[10px] border border-black/80 bg-[#1e1e1e]">
      <div className="h-7 border-b border-black/70 bg-[#323232]" />
    </div>
  ),
});

export default function LazyTerminalBio() {
  return <TerminalBio />;
}
