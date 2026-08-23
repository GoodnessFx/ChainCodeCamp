import Link from "next/link";
import { CURRICULUM_SECTIONS } from "@/lib/curriculum";
import { ArrowRight, Lock } from "lucide-react";
import StageTag from "@/components/ui/StageTag";
import DifficultyBadge from "@/components/ui/DifficultyBadge";

const FOUNDATIONS = CURRICULUM_SECTIONS.filter((s) => s.track === "foundations");
const SECURITY = CURRICULUM_SECTIONS.filter((s) => s.track === "security");

function SectionCard({
  slug,
  stage,
  title,
  description,
  difficulty,
  track,
  estimatedTime,
}: (typeof CURRICULUM_SECTIONS)[0]) {
  return (
    <Link
      href={`/curriculum/${slug}`}
      className="stage-card block no-underline group"
    >
      {/* Top strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

      <div className="flex items-start justify-between gap-4 mb-3">
        <StageTag stage={stage} track={track} />
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="font-body text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-mono text-xs text-gray-400">{estimatedTime}</span>
        <span className="font-heading font-bold text-xs uppercase text-primary flex items-center gap-1">
          Start <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function TrackCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Foundations track */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-heading font-bold text-3xl border-b-4 border-ink pb-1 inline-block">
            Track 1: Foundations
          </h2>
        </div>
        <p className="font-body text-gray-600 mb-8 max-w-2xl">
          EVM internals → Solidity → Assembly → Foundry. The technical bedrock
          every serious auditor needs before touching a real codebase.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {FOUNDATIONS.map((s) => (
            <SectionCard key={s.slug} {...s} />
          ))}
        </div>
      </div>

      {/* Security track */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-heading font-bold text-3xl border-b-4 border-primary pb-1 inline-block text-primary">
            Track 2: Security &amp; Auditing
          </h2>
        </div>
        <p className="font-body text-gray-600 mb-8 max-w-2xl">
          Vulnerability classes → DeFi attack vectors → Static analysis →
          Formal verification → Writing reports → Landing your first paid finding.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {SECURITY.map((s) => (
            <SectionCard key={s.slug} {...s} />
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/curriculum" className="btn btn-primary">
          See Full Curriculum <ArrowRight size={16} />
        </Link>
        <Link href="/community#bounties" className="btn btn-outline">
          Bug Bounty Tracker
        </Link>
      </div>
    </section>
  );
}
