"use client";

import { getSupabaseClient } from "./supabase";

const STORAGE_KEY = "ccc_progress";

// ─── localStorage layer (always works, no auth required) ──────

export function getCompletedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function setLocalSlugs(slugs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event("ccc_progress_updated"));
}

export function isComplete(slug: string): boolean {
  return getCompletedSlugs().includes(slug);
}

export function getCompletionCount(): number {
  return getCompletedSlugs().length;
}

// ─── Supabase sync (fires when client is available) ──────────

async function syncToSupabase(slug: string, remove = false) {
  const sb = getSupabaseClient();
  if (!sb) return;

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return;

  if (remove) {
    await sb
      .from("progress")
      .delete()
      .eq("user_id", user.id)
      .eq("slug", slug);
  } else {
    await sb
      .from("progress")
      .upsert({ user_id: user.id, slug }, { onConflict: "user_id,slug" });
  }
}

/**
 * Pull progress from Supabase and merge with localStorage.
 * Call this once on app load when user is signed in.
 */
export async function syncFromSupabase(): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) return;

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return;

  const { data, error } = await sb
    .from("progress")
    .select("slug")
    .eq("user_id", user.id);

  if (error || !data) return;

  const remoteSlugs = data.map((r: { slug: string }) => r.slug);
  const localSlugs = getCompletedSlugs();

  // Merge: union of remote and local
  const merged = Array.from(new Set([...localSlugs, ...remoteSlugs]));
  setLocalSlugs(merged);

  // Push any local-only slugs up to Supabase
  const localOnly = localSlugs.filter((s) => !remoteSlugs.includes(s));
  if (localOnly.length > 0) {
    const rows = localOnly.map((slug) => ({ user_id: user.id, slug }));
    await sb.from("progress").upsert(rows, { onConflict: "user_id,slug" });
  }
}

// ─── Public API ───────────────────────────────────────────────

export function markComplete(slug: string): void {
  const slugs = getCompletedSlugs();
  if (!slugs.includes(slug)) {
    setLocalSlugs([...slugs, slug]);
    syncToSupabase(slug); // fire-and-forget
  }
}

export function markIncomplete(slug: string): void {
  setLocalSlugs(getCompletedSlugs().filter((s) => s !== slug));
  syncToSupabase(slug, true); // fire-and-forget
}

export function toggleComplete(slug: string): void {
  isComplete(slug) ? markIncomplete(slug) : markComplete(slug);
}
