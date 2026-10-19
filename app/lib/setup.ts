"use client";

import { TOOLS } from "./tools";

const STORAGE_KEY = "ccc_setup";

/** Tool ids the learner ticked off as "installed and verified". */
export function getInstalledTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function setInstalled(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("ccc_setup_updated"));
}

export function isToolInstalled(id: string): boolean {
  return getInstalledTools().includes(id);
}

export function toggleTool(id: string): void {
  const ids = getInstalledTools();
  setInstalled(ids.includes(id) ? ids.filter((t) => t !== id) : [...ids, id]);
}

/** Setup score: percentage of registry tools the learner has ticked off. */
export function getSetupScore(installedIds?: string[]): number {
  const ids = installedIds ?? getInstalledTools();
  if (TOOLS.length === 0) return 0;
  return Math.round((ids.length / TOOLS.length) * 100);
}
