import Link from "next/link";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-12 px-6 py-16 text-center"
    >
      <header className="flex flex-col items-center gap-4">
        <span className="text-brand">
          <Logo className="h-16 w-16" />
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          ChainCodeCamp
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Security first. Learn by doing.
        </p>
      </header>

      <div className="grid w-full gap-6 sm:grid-cols-2">
        <Link
          href="/basics"
          className="group flex flex-col items-start gap-3 rounded-xl border-2 border-zinc-300 bg-white p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-brand"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Beginner path
          </span>
          <span className="text-2xl font-bold">Start from zero</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            No blockchain experience needed. Transactions, contracts and
            security from the very first step.
          </span>
          <span aria-hidden className="mt-auto text-lg text-brand">
            →
          </span>
        </Link>

        <Link
          href="/core"
          className="group flex flex-col items-start gap-3 rounded-xl border-2 border-zinc-300 bg-white p-8 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-brand"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Experienced path
          </span>
          <span className="text-2xl font-bold">I know the basics</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Jump into the core course: real vulnerabilities, real tools, real
            exploits on your own machine.
          </span>
          <span aria-hidden className="mt-auto text-lg text-brand">
            →
          </span>
        </Link>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand underline underline-offset-4"
        >
          Log in
        </Link>{" "}
        or{" "}
        <Link
          href="/signup"
          className="font-medium text-brand underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
