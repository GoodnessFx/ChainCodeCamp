"use client";

import ShellLayout from "@/components/ShellLayout";
import { CURRICULUM_SECTIONS, TOTAL_SECTIONS } from "@/lib/curriculum";
import { getCompletedSlugs } from "@/lib/progress";
import Link from "next/link";
import { useEffect, useState } from "react";
import StageTag from "@/components/ui/StageTag";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import ProgressDots from "@/components/ui/ProgressDots";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const FOUNDATIONS = CURRICULUM_SECTIONS.filter((s) => s.track === "foundations");
const SECURITY = CURRICULUM_SECTIONS.filter((s) => s.track === "security");

export default function CurriculumPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setCompleted(getCompletedSlugs());
    refresh();
    window.addEventListener("ccc_progress_updated", refresh);
    return () => window.removeEventListener("ccc_progress_updated", refresh);
  }, []);

  const completedIndices = CURRICULUM_SECTIONS.map((s, i) =>
    completed.includes(s.slug) ? i + 1 : null
  ).filter(Boolean) as number[];

  const percent = Math.round((completed.length / TOTAL_SECTIONS) * 100);

  return (
    <ShellLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="mb-4">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
            Full Curriculum
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-2 mb-4">
            10 Sections. Two Tracks.
          </h1>
          <p className="font-body text-gray-600 max-w-2xl text-lg leading-relaxed">
            Start at Section 01 and work through in order. Each section builds
            on the last. Skip the foundations and you'll miss the security
            flaws that cost millions.
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-white border-2 border-ink p-6 shadow-hard mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
              Your Progress
            </span>
            <span className="font-heading font-bold text-2xl">
              {percent}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 border border-ink mb-4">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          {/* Cyfrin-style progress dots */}
          <ProgressDots
            total={TOTAL_SECTIONS}
            current={completed.length + 1}
            completed={completedIndices}
          />
          <p className="font-mono text-xs text-gray-400 mt-3">
            {completed.length}/{TOTAL_SECTIONS} sections complete
          </p>
        </div>

        {/* Track 1 */}
        <Track
          label="Track 1"
          title="Foundations"
          accentClass="border-secondary"
          titleClass="text-secondary"
          description="EVM → Solidity → Assembly → Foundry. The engine before the exploits."
          sections={FOUNDATIONS}
          completed={completed}
        />

        {/* Track 2 */}
        <Track
          label="Track 2"
          title="Security & Auditing"
          accentClass="border-primary"
          titleClass="text-primary"
          description="Vulnerability classes → DeFi attacks → Tooling → Writing reports → Paid findings."
          sections={SECURITY}
          completed={completed}
        />
      </div>
    </ShellLayout>
  );
}

function Track({
  label,
  title,
  description,
  accentClass,
  titleClass,
  sections,
  completed,
}: {
  label: string;
  title: string;
  description: string;
  accentClass: string;
  titleClass: string;
  sections: typeof CURRICULUM_SECTIONS;
  completed: string[];
}) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
          {label}
        </span>
        <h2
          className={`font-heading font-bold text-3xl border-b-4 ${accentClass} pb-1 inline-block ${titleClass}`}
        >
          {title}
        </h2>
        <p className="font-body text-gray-600 mt-2 max-w-2xl">{description}</p>
      </div>

      <div className="space-y-3">
        {sections.map((s, idx) => {
          const done = completed.includes(s.slug);
          const globalIdx = CURRICULUM_SECTIONS.findIndex(
            (c) => c.slug === s.slug
          );
          const isNext =
            !done &&
            globalIdx ===
              CURRICULUM_SECTIONS.findIndex((c) => !completed.includes(c.slug));

          return (
            <Link
              key={s.slug}
              href={`/curriculum/${s.slug}`}
              className={[
                "flex items-center gap-4 bg-white border-2 border-ink px-5 py-4 no-underline",
                "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard transition-all group",
                done ? "opacity-80" : "",
              ].join(" ")}
            >
              {/* Check icon */}
              <span className="flex-shrink-0">
                {done ? (
                  <CheckCircle2 size={22} className="text-success" />
                ) : (
                  <Circle
                    size={22}
                    className={isNext ? "text-primary" : "text-gray-300"}
                  />
                )}
              </span>

              {/* Stage number */}
              <span className="font-mono text-sm font-bold text-gray-400 w-8 flex-shrink-0">
                {s.stage}
              </span>

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-base group-hover:text-primary transition-colors truncate">
                  {s.title}
                </p>
                <p className="font-mono text-xs text-gray-400 hidden sm:block truncate">
                  {s.estimatedTime} · {s.tags.slice(0, 3).join(", ")}
                </p>
              </div>

              {/* Badges */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                <DifficultyBadge difficulty={s.difficulty} />
                {isNext && (
                  <span className="font-mono text-xs font-bold text-primary border-2 border-primary px-2 py-0.5 uppercase">
                    Up Next
                  </span>
                )}
              </div>

              <ArrowRight
                size={16}
                className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
