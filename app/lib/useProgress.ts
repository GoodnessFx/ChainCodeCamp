"use client";

import { useEffect, useState, useCallback } from "react";
import { getCompletedSlugs, markComplete, markIncomplete, toggleComplete, syncFromSupabase } from "./progress";
import { TOTAL_SECTIONS } from "./curriculum";
import { getSupabaseClient } from "./supabase";

export interface ProgressState {
  completed: string[];
  count: number;
  percent: number;
  isComplete: (slug: string) => boolean;
  markComplete: (slug: string) => void;
  markIncomplete: (slug: string) => void;
  toggle: (slug: string) => void;
}

export function useProgress(): ProgressState {
  const [completed, setCompleted] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setCompleted(getCompletedSlugs());
  }, []);

  useEffect(() => {
    refresh();

    // Listen for updates from any tab or component
    window.addEventListener("ccc_progress_updated", refresh);
    return () => window.removeEventListener("ccc_progress_updated", refresh);
  }, [refresh]);

  // On mount: if Supabase is configured and user is signed in, sync remote → local
  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) return;

    sb.auth.getUser().then(({ data }) => {
      if (data.user) {
        syncFromSupabase().then(refresh);
      }
    });

    // Re-sync when auth state changes (login / logout)
    const { data: listener } = sb.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        syncFromSupabase().then(refresh);
      }
      if (event === "SIGNED_OUT") {
        refresh(); // keep localStorage, just stop syncing
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [refresh]);

  const count = completed.length;
  const percent = Math.round((count / TOTAL_SECTIONS) * 100);

  return {
    completed,
    count,
    percent,
    isComplete: (slug) => completed.includes(slug),
    markComplete,
    markIncomplete,
    toggle: toggleComplete,
  };
}
