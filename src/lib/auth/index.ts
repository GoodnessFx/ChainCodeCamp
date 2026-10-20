import type { AuthProvider } from "./AuthProvider";
import { mockAuthProvider } from "./MockAuthProvider";

export type { AuthProvider, AuthResult, AuthUser } from "./AuthProvider";

let provider: AuthProvider | null = null;

/** Factory: picks the auth implementation from env. Only "mock" ships today. */
export function getAuthProvider(): AuthProvider {
  if (provider) return provider;
  const name = process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "mock";
  switch (name) {
    case "supabase":
      throw new Error(
        "Supabase AuthProvider is not implemented yet. Set NEXT_PUBLIC_AUTH_PROVIDER=mock."
      );
    case "nextauth":
      throw new Error(
        "NextAuth AuthProvider is not implemented yet. Set NEXT_PUBLIC_AUTH_PROVIDER=mock."
      );
    default:
      provider = mockAuthProvider;
      return provider;
  }
}
