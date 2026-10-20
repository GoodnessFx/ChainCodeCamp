/**
 * Auth interface. The UI only ever talks to this contract, so a real
 * provider (Supabase, NextAuth) can be swapped in later with zero UI changes.
 * Select the implementation via NEXT_PUBLIC_AUTH_PROVIDER in .env.local.
 */
export interface AuthUser {
  email: string;
  createdAt: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: AuthUser;
}

export interface AuthProvider {
  /** Create an account. Returns ok=false with a user-facing message on failure. */
  signUp(email: string, password: string): Promise<AuthResult>;
  /** Sign in. Never reveals whether the email exists. */
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<void>;
  /** Current session user, or null. */
  getUser(): Promise<AuthUser | null>;
}
