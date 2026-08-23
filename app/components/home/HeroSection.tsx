import Link from "next/link";
import { ArrowRight, Shield, Code2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-white overflow-hidden border-b-[3px] border-ink min-h-[520px] flex flex-col justify-center px-8 md:px-16">
      {/* dot-grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(#cc3d00 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        {/* Accent bar */}
        <div className="w-20 h-2 bg-ink mb-6" />

        <h1 className="font-heading font-bold text-white uppercase leading-none mb-4"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            WebkitTextStroke: "2px #1a1a1a",
            textShadow: "6px 6px 0px #1a1a1a",
          }}
        >
          Learn Smart Contract Security. For Free. For Real.
        </h1>

        <p className="font-heading font-semibold text-ink text-lg md:text-2xl bg-white border-2 border-ink px-4 py-2 inline-block shadow-hard mb-10 max-w-2xl">
          EVM internals → Solidity → Assembly → Real audits → Paid findings.
          Built for African &amp; self-taught devs who can&apos;t afford $5k bootcamps.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/curriculum/evm-fundamentals"
            className="btn btn-primary text-base gap-3"
          >
            <Shield size={20} />
            Start Learning
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/curriculum"
            className="btn btn-outline text-base gap-3 bg-white text-ink"
          >
            <Code2 size={20} />
            View Curriculum
          </Link>
        </div>

        {/* Inspired-by note */}
        <p className="font-mono text-xs text-ink/70 mt-8">
          Inspired by freeCodeCamp&apos;s structure + Cyfrin Updraft&apos;s security depth.
          Built different — no paywall on core content, ever.
        </p>
      </div>
    </section>
  );
}
