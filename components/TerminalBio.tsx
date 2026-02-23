import { Card } from "@/components/ui/card";

export default function TerminalBio() {
  return (
    <Card className="overflow-hidden bg-zinc-950 border-zinc-800 font-mono text-sm mb-6">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>
      {/* Body */}
      <div className="p-4 space-y-1 text-zinc-300">
        <p>
          <span className="text-primary">$</span>{" "}
          <span className="text-zinc-400">whoami</span>
        </p>
        <p className="text-zinc-200">sunny-chen</p>
        <p className="mt-2">
          <span className="text-primary">$</span>{" "}
          <span className="text-zinc-400">cat about.txt</span>
        </p>
        <p>
          <span className="text-zinc-500">&gt;</span> Software developer based in Montreal
        </p>
        <p>
          <span className="text-zinc-500">&gt;</span> Passionate about robotics &amp; simulation
        </p>
        <p>
          <span className="text-zinc-500">&gt;</span> Currently building: F1 Prediction Model
        </p>
        <p>
          <span className="text-zinc-500">&gt;</span> Open to: Full-time &amp; internship opportunities
        </p>
        <p className="mt-2">
          <span className="text-primary">$</span>{" "}
          <span className="animate-pulse text-primary">|</span>
        </p>
      </div>
    </Card>
  );
}
