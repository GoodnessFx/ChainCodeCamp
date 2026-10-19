"use client";

import { getSupabaseClient } from "./supabase";

export interface AuthUser {
  id: string;
  email?: string;
  userName?: string;
  avatarUrl?: string;
}

/** True only when the Supabase project env vars are present. */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const sb = getSupabaseClient();
  if (!sb) return null;
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? undefined,
    userName: (user.user_metadata?.user_name as string | undefined) ?? undefined,
    avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? undefined,
  };
}

export async function signInWithGitHub(): Promise<{ error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { error: "Supabase is not configured yet. Use a token below instead." };
  const { error } = await sb.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
  });
  return error ? { error: error.message } : {};
}

export async function signOut(): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) return;
  await sb.auth.signOut();
}
