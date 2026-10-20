import type { AuthProvider, AuthResult, AuthUser } from "./AuthProvider";

/**
 * MOCK auth provider. Accounts live in localStorage so the full signup ->
 * login -> dashboard flow works with no backend. This is NOT real security:
 * it exists only so a real provider can be dropped in behind the same
 * interface later. Do not use for anything that matters.
 */
const USERS_KEY = "ccc_mock_users";
const SESSION_KEY = "ccc_mock_session";

interface StoredUser {
  email: string;
  pw: string; // obfuscated only, deliberately not hashed: it is a mock
  createdAt: string;
}

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function obfuscate(pw: string): string {
  try {
    return btoa(pw);
  } catch {
    return pw;
  }
}

export class MockAuthProvider implements AuthProvider {
  async signUp(email: string, password: string): Promise<AuthResult> {
    const e = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((u) => u.email === e)) {
      return { ok: false, error: "An account with this email already exists. Try logging in." };
    }
    users.push({ email: e, pw: obfuscate(password), createdAt: new Date().toISOString() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const user: AuthUser = { email: e, createdAt: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    const e = email.trim().toLowerCase();
    const user = readUsers().find((u) => u.email === e);
    if (!user || user.pw !== obfuscate(password)) {
      return { ok: false, error: "Wrong email or password." };
    }
    const auth: AuthUser = { email: e, createdAt: user.createdAt };
    localStorage.setItem(SESSION_KEY, JSON.stringify(auth));
    return { ok: true, user: auth };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
  }

  async getUser(): Promise<AuthUser | null> {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}

export const mockAuthProvider = new MockAuthProvider();
