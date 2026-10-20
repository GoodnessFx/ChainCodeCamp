"use client";

import Logo from "./Logo";

/**
 * Full-screen splash: logo + tagline, auto-advances to /landing (the parent
 * page owns the timer), and is skippable. Reduced-motion users get a static
 * frame thanks to the global CSS rule.
 */
export default function SplashScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <div
      role="status"
      aria-label="ChainCodeCamp is loading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center text-zinc-100"
    >
      <div className="animate-[ccc-fade_0.6s_ease-out_both] text-brand">
        <Logo className="h-24 w-24" />
      </div>
      <p className="animate-[ccc-fade_0.6s_ease-out_0.35s_both] text-lg font-medium tracking-wide text-zinc-200 sm:text-xl">
        Security first. Learn by doing.
      </p>
      <div
        aria-hidden
        className="mt-2 h-1.5 w-52 overflow-hidden rounded-full bg-zinc-800"
      >
        <div className="h-full w-full origin-left animate-[ccc-grow_1.6s_linear_0.6s_both] bg-brand" />
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-6 right-6 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
      >
        Skip
      </button>
    </div>
  );
}
