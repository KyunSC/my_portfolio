"use client";

import { useSyncExternalStore } from "react";
import { findF1Team, type F1TeamId } from "@/lib/f1-teams";

const STORAGE_KEY = "f1-team";
const listeners = new Set<() => void>();
let fallback: F1TeamId = "red-bull";

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
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
  listeners.forEach((listener) => listener());
}

export function useF1Team() {
  return findF1Team(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}
