"use client";

import Link from "next/link";
import { useProgress } from "@/lib/useProgress";
import type { CurriculumSection } from "@/types/curriculum";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  slug: string;
  prevSection: CurriculumSection | null;
  nextSection: CurriculumSection | null;
}

export default function LessonNav({ slug, prevSection, nextSection }: Props) {
  const { isComplete, toggle } = useProgress();
  const done = isComplete(slug);

  const handleToggle = () => toggle(slug);

  return (
    <footer className="mt-16 pt-8 border-t-[3px] border-ink">
      {/* Mark complete button */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <button
          onClick={handleToggle}
          className={[
            "btn text-sm gap-2 transition-all",
            done
              ? "bg-success text-white border-success shadow-none"
              : "btn-primary",
          ].join(" ")}
        >
          <CheckCircle2 size={18} />
          {done ? "Completed ✓" : "Mark Section Complete"}
        </button>

        {done && nextSection && (
          <Link
            href={`/curriculum/${nextSection.slug}`}
            className="btn btn-outline text-sm gap-2"
          >
            Next: {nextSection.title} <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevSection ? (
          <Link
            href={`/curriculum/${prevSection.slug}`}
            className="flex items-center gap-3 bg-white border-2 border-ink px-4 py-4 no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all group"
          >
            <ArrowLeft size={18} className="flex-shrink-0 text-gray-400 group-hover:text-primary" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                Previous
              </p>
              <p className="font-heading font-bold text-sm group-hover:text-primary transition-colors">
                {prevSection.stage}: {prevSection.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextSection ? (
          <Link
            href={`/curriculum/${nextSection.slug}`}
            className="flex items-center justify-end gap-3 bg-white border-2 border-ink px-4 py-4 no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all group text-right"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                Next
              </p>
              <p className="font-heading font-bold text-sm group-hover:text-primary transition-colors">
                {nextSection.stage}: {nextSection.title}
              </p>
            </div>
            <ArrowRight size={18} className="flex-shrink-0 text-gray-400 group-hover:text-primary" />
          </Link>
        ) : (
          <div className="flex items-center justify-end gap-3 bg-[var(--primary-light)] border-2 border-primary px-4 py-4">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                🎉 Track Complete
              </p>
              <Link href="/certificate" className="font-heading font-bold text-sm text-primary no-underline">
                Claim Your Certificate →
              </Link>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
