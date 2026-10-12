"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

/* ── Window chrome ── */

interface TerminalWindowProps {
  /** Working-directory name shown in the title bar, like Terminal.app. */
  title: string;
  className?: string;
  bodyClassName?: string;
  bodyRef?: RefObject<HTMLDivElement | null>;
  /** Called when the window is clicked (but not when the user is selecting text). */
  onActivate?: () => void;
  children: ReactNode;
}

export function TerminalWindow({
  title,
  className,
  bodyClassName,
  bodyRef,
  onActivate,
  children,
}: TerminalWindowProps) {
  const localBodyRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ cols: 80, rows: 24 });

  // Report the real grid size in the title, the way Terminal.app does ("80×24").
  useEffect(() => {
    const body = bodyRef?.current ?? localBodyRef.current;
    const probe = measureRef.current;
    if (!body || !probe) return;

    const update = () => {
      const style = getComputedStyle(body);
      const width = body.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const height = body.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      const charWidth = probe.offsetWidth / 10;
      const lineHeight = probe.offsetHeight;
      if (!charWidth || !lineHeight) return;
      setSize({ cols: Math.floor(width / charWidth), rows: Math.floor(height / lineHeight) });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(body);
    return () => observer.disconnect();
  }, [bodyRef]);

  const handleClick = () => {
    // Let people drag-select and copy output without the click stealing focus.
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return;
    onActivate?.();
  };

  return (
    <div
      className={cn(
        "group/terminal relative flex flex-col overflow-hidden rounded-[10px] border border-black/80 bg-[#1e1e1e] shadow-[0_22px_50px_-12px_rgba(0,0,0,0.55)]",
        className
      )}
      onClick={handleClick}
    >
      {/* Title bar */}
      <div className="relative flex h-7 shrink-0 items-center border-b border-black/70 bg-[#323232] px-[13px] select-none">
        <TrafficLights />
        <div className="terminal-title pointer-events-none absolute inset-x-[76px] flex items-center justify-center gap-1.5 text-[13px] font-semibold text-zinc-500 transition-colors group-focus-within/terminal:text-zinc-300">
          <FolderIcon />
          <span className="truncate">
            {title} — -zsh — {size.cols}×{size.rows}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyRef ?? localBodyRef}
        className={cn("terminal-body relative flex-1 cursor-text overflow-y-auto px-2.5 py-1.5", bodyClassName)}
      >
        <div ref={measureRef} aria-hidden className="pointer-events-none invisible absolute left-0 top-0 whitespace-pre">
          0000000000
        </div>
        {children}
      </div>

      {/* Hairline highlight around the window edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-white/10 ring-inset" />
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="group/lights flex items-center gap-2" aria-hidden>
      <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#e0443e] bg-[#ff5f57]">
        <svg viewBox="0 0 12 12" className="h-full w-full opacity-0 group-hover/lights:opacity-100" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round">
          <path d="M3.75 3.75l4.5 4.5M8.25 3.75l-4.5 4.5" />
        </svg>
      </span>
      <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#dea123] bg-[#febc2e]">
        <svg viewBox="0 0 12 12" className="h-full w-full opacity-0 group-hover/lights:opacity-100" stroke="#995700" strokeWidth="1.3" strokeLinecap="round">
          <path d="M3 6h6" />
        </svg>
      </span>
      <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#1aab29] bg-[#28c840]">
        <svg viewBox="0 0 12 12" className="h-full w-full opacity-0 group-hover/lights:opacity-100" fill="#006500">
          <path d="M3.5 3.5h4l-4 4z M8.5 8.5h-4l4-4z" />
        </svg>
      </span>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 16 13" className="h-3 w-3.5 shrink-0" aria-hidden>
      <path d="M1 2.2C1 1.5 1.5 1 2.2 1h3.6l1.5 1.5h6.5c.7 0 1.2.5 1.2 1.2V4H1z" fill="#3d8fd6" />
      <path d="M1 4h14v7.3c0 .7-.5 1.2-1.2 1.2H2.2c-.7 0-1.2-.5-1.2-1.2z" fill="#5eb0f0" />
    </svg>
  );
}

/* ── oh-my-zsh "robbyrussell" prompt: green arrow, red after a failed command ── */

export function Prompt({ dir, ok = true }: { dir: string; ok?: boolean }) {
  return (
    <>
      <span className={cn("font-bold", ok ? "text-green-400" : "text-red-400")}>➜</span>
      {"  "}
      <span className="font-bold text-cyan-400">{dir}</span>{" "}
    </>
  );
}

/* ── Input line with a block cursor that follows the caret ── */

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  /** Draw the cursor as focused even without focus (e.g. during scripted typing). */
  forceActive?: boolean;
}

export function TerminalInput({ value, onChange, onKeyDown, inputRef, forceActive }: TerminalInputProps) {
  const [focused, setFocused] = useState(false);
  const [selection, setSelection] = useState({ value, caret: value.length });

  // A value set from outside (history recall, tab completion) leaves the caret
  // at the end, matching what the native input does.
  const caret = selection.value === value ? Math.min(selection.caret, value.length) : value.length;
  const syncCaret = (el: HTMLInputElement) =>
    setSelection({ value: el.value, caret: el.selectionStart ?? el.value.length });

  const active = focused || forceActive;

  return (
    <>
      {value.slice(0, caret)}
      {/* Keyed on content so the blink restarts on every keystroke, like a real terminal */}
      <span
        key={`${caret}:${value}`}
        className={active ? "terminal-cursor terminal-cursor-active" : "terminal-cursor terminal-cursor-idle"}
      >
        {value[caret] ?? " "}
      </span>
      {value.slice(caret + 1)}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          syncCaret(e.target);
        }}
        onSelect={(e) => syncCaret(e.currentTarget)}
        onKeyUp={(e) => syncCaret(e.currentTarget)}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // Invisible and unclickable: the visible text above is the real UI. 16px stops iOS zooming on focus.
        className="pointer-events-none absolute inset-0 h-full w-full text-base caret-transparent opacity-0"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="go"
        aria-label="Terminal input"
      />
    </>
  );
}
