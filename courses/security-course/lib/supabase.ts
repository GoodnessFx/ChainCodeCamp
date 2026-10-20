import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Returns a singleton Supabase browser client.
 * Safe to call from any client component.
 */
export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null gracefully when env vars aren't set yet
  // (progress falls back to localStorage)
  if (!url || !key) return null;

  client = createBrowserClient(url, key);
  return client;
}

export type SupabaseClient = ReturnType<typeof createBrowserClient>;
