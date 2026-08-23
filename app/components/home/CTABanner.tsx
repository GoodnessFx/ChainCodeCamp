import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-ink text-white py-16 px-6 border-t-2 border-ink">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-1 bg-primary mx-auto mb-6" />
        <h2
          className="font-heading font-bold text-white uppercase mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Ready to start?
        </h2>
        <p className="font-heading font-semibold text-white/70 text-lg mb-10 max-w-xl mx-auto">
          No signup required to browse. Just open the first section and start
          building. Come back when you&apos;re ready to track progress.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/curriculum/evm-fundamentals"
            className="btn btn-primary text-base"
          >
            Section 01: EVM Fundamentals <ArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/GoodnessFx/ChainCodeCamp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-base gap-2"
            style={{ background: "transparent", color: "white", borderColor: "white" }}
          >
            <Github size={18} />
            GitHub
          </a>
        </div>

        <p className="font-mono text-xs text-white/30 mt-10">
          MIT Licensed. Fork it. Improve it. Credit us.
        </p>
      </div>
    </section>
  );
}
