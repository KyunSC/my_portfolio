"use client";

import { useSyncExternalStore } from "react";
import { findF1Team, type F1TeamId } from "@/lib/f1-teams";

const STORAGE_KEY = "f1-team";
const listeners = new Set<() => void>();
let fallback: F1TeamId = "red-bull";

// Drives the per-team CSS tokens; the inline <head> script sets it pre-paint.
function notify(id: F1TeamId) {
  document.documentElement.dataset.f1Team = id;
  listeners.forEach((listener) => listener());
}

// Registered once so other tabs' selections apply even with no consumer
// mounted. Sync snaps; only a local selection cross-fades.
function onStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY || event.key === null) notify(getSnapshot());
}

if (typeof window !== "undefined") window.addEventListener("storage", onStorage);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): F1TeamId {
  try {
    return findF1Team(localStorage.getItem(STORAGE_KEY)).id;
  } catch {
    return fallback;
  }
}

function getServerSnapshot(): F1TeamId {
  return "red-bull";
}

export function selectF1Team(id: string) {
  fallback = findF1Team(id).id;
  try {
    localStorage.setItem(STORAGE_KEY, fallback);
  } catch {
    // Selection still works when browser storage is unavailable.
  }
  const team = fallback;
  // One composited cross-fade of the whole page, so every token changes together.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("startViewTransition" in document && !reduceMotion) {
    document.startViewTransition(() => notify(team));
  } else {
    notify(team);
  }
}

export function useF1Team() {
  return findF1Team(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}
