"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Flag, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeId = "default" | "f1" | "finance";

const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "default", label: "Coding", swatch: "oklch(0.5 0.19 146)" },
  { id: "f1", label: "F1", swatch: "oklch(0.6 0.23 27)" },
  { id: "finance", label: "Finance", swatch: "#c5ed85" },
];

// Tiny external store backed by localStorage so the active theme can be read
// without a setState-in-effect (the inline <head> script applies it pre-paint).
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): ThemeId {
  const stored = localStorage.getItem("theme") as ThemeId | null;
  return stored && THEMES.some((t) => t.id === stored) ? stored : "default";
}

function applyTheme(id: ThemeId) {
  localStorage.setItem("theme", id);
  if (id === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", id);
  }
  listeners.forEach((cb) => cb());
}

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "default" as ThemeId);
  const [open, setOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dismissInvite = () => {
    setShowInvite(false);
  };

  useEffect(() => {
    if (theme !== "default") return;
    const timer = window.setTimeout(() => setShowInvite(true), 5000);
    return () => window.clearTimeout(timer);
  }, [theme]);

  useEffect(() => {
    if (!showInvite) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissInvite();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showInvite]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (id: ThemeId) => {
    if (id !== theme) setShowInvite(false);
    applyTheme(id);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative overflow-visible">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Switch theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:text-primary"
      >
        <Palette />
      </Button>

      {showInvite && !open && (
        <aside
          aria-label="Try the F1 theme"
          className="f1-theme-invite absolute left-1/2 top-full z-50 mt-4 w-64 max-w-[calc(100vw-5rem)] -translate-x-1/2 rounded-xl border border-border bg-background p-4 shadow-xl md:left-auto md:right-0 md:translate-x-0"
        >
          {/* The navbar is fixed; this pointer stays aligned with its palette button. */}
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-background md:left-auto md:right-2.5 md:translate-x-0"
          />
          <button
            type="button"
            aria-label="Dismiss F1 invitation"
            onClick={dismissInvite}
            className="absolute right-1 top-1 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-4" />
          </button>
          <div className="mb-2 flex items-center gap-2 pr-5 text-sm font-semibold">
            <Flag className="size-4 text-primary" aria-hidden="true" />
            Fancy a lap?
          </div>
          <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
            Explore my racing side with animated cars and a Nürburgring career circuit.
          </p>
          <Button size="sm" className="w-full text-xs" onClick={() => select("f1")}>
            Try F1 mode
          </Button>
        </aside>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-40 origin-top-right rounded-xl border border-border bg-background/95 p-1 shadow-lg backdrop-blur-md"
          >
            {THEMES.map(({ id, label, swatch }) => (
              <button
                key={id}
                role="menuitemradio"
                aria-checked={theme === id}
                onClick={() => select(id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-colors hover:bg-accent",
                  theme === id ? "text-primary font-semibold" : "text-foreground"
                )}
              >
                <span
                  className="size-3 shrink-0 rounded-full ring-1 ring-border"
                  style={{ backgroundColor: swatch }}
                />
                <span className="flex-1 text-left">{label}</span>
                {theme === id && <Check className="size-3" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
