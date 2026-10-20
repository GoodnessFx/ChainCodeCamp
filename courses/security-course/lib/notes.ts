"use client";

const KEY = "ccc_notes_v1";

/** slug -> free text notes, one entry per completed or in-progress lesson. */
export function getNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function getNote(slug: string): string {
  return getNotes()[slug] ?? "";
}

export function setNote(slug: string, text: string): void {
  const all = getNotes();
  if (text.trim()) {
    all[slug] = text;
  } else {
    delete all[slug];
  }
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("ccc_notes_updated"));
}

export function notesCount(): number {
  return Object.keys(getNotes()).length;
}
