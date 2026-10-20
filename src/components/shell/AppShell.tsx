"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import ThemeToggle from "./ThemeToggle";
import { getAuthProvider, type AuthUser } from "@/lib/auth";

const NAV = [
  { href: "/basics", label: "Basics" },
  { href: "/core", label: "Core Course" },
  { href: "/notes", label: "Notes" },
  { href: "/tools", label: "Tools" },
  { href: "/community", label: "Community" },
];

/**
 * Dashboard shell: sidebar (desktop rail + mobile drawer), top bar with
 * progress placeholder, theme toggle and user menu. Guards every page in the
 * (shell) route group: no session -> /login.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getAuthProvider().getUser().then((u) => {
      if (u) setUser(u);
      else router.replace("/login");
    });
  }, [router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function signOut() {
    await getAuthProvider().signOut();
    router.replace("/landing");
  }

  if (user === undefined) {
    return (
      <div role="status" className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const nav = (
    <nav aria-label="Main" className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={active ? "page" : undefined}
            className={[
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand text-zinc-950"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 flex-col border-r-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2.5 px-2">
          <span className="text-brand">
            <Logo className="h-8 w-8" />
          </span>
          <span className="text-base font-bold">ChainCodeCamp</span>
        </Link>
        {nav}
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-zinc-950/60"
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col border-r-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
                <span className="text-brand">
                  <Logo className="h-8 w-8" />
                </span>
                <span className="text-base font-bold">ChainCodeCamp</span>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-md border-2 border-zinc-300 p-1.5 dark:border-zinc-700"
              >
                <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      {/* Right column */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b-2 border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-md border-2 border-zinc-300 p-2 dark:border-zinc-700 md:hidden"
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* Progress tracker placeholder (Phase 3 wires real progress) */}
          <div className="hidden items-center gap-2 lg:flex" aria-label="Progress: 0 percent">
            <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Progress
            </span>
            <div
              role="progressbar"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Course progress"
              className="h-1.5 w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
            >
              <div className="h-full w-0 bg-brand" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">0%</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <span className="hidden max-w-[14rem] truncate text-sm text-zinc-600 dark:text-zinc-300 sm:inline">
              {user.email}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="rounded-md border-2 border-zinc-300 px-3 py-1.5 text-sm font-medium hover:border-brand dark:border-zinc-700"
            >
              Sign out
            </button>
          </div>
        </header>

        <main id="main-content" className="flex-1 px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
