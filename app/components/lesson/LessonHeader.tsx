"use client";

import { useProgress } from "@/lib/useProgress";
import { CURRICULUM_SECTIONS, TOTAL_SECTIONS } from "@/lib/curriculum";
import type { CurriculumSection } from "@/types/curriculum";
import ProgressDots from "@/components/ui/ProgressDots";
import StageTag from "@/components/ui/StageTag";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import ContractLink from "@/components/ui/ContractLink";
import HackCallout from "@/components/ui/HackCallout";
import { Clock } from "lucide-react";

interface Props {
  section: CurriculumSection;
  currentIndex: number;
}

export default function LessonHeader({ section, currentIndex }: Props) {
  const { completed, count } = useProgress();

  const completedIndices = CURRICULUM_SECTIONS.map((s, i) =>
    completed.includes(s.slug) ? i + 1 : null
  ).filter(Boolean) as number[];

  return (
    <header className="mb-10">
      {/* Progress dots — Cyfrin style, top of every section */}
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
          Course Progress — {count}/{TOTAL_SECTIONS} sections
        </p>
        <ProgressDots
          total={TOTAL_SECTIONS}
          current={currentIndex + 1}
          completed={completedIndices}
        />
      </div>

      {/* Stage / difficulty row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <StageTag stage={section.stage} track={section.track} />
        <DifficultyBadge difficulty={section.difficulty} />
        <span className="flex items-center gap-1 font-mono text-xs text-gray-400">
          <Clock size={12} />
          {section.estimatedTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 leading-tight">
        {section.title}
      </h1>

      {/* Description */}
      <p className="font-body text-lg text-gray-600 leading-relaxed max-w-2xl mb-6">
        {section.description}
      </p>

      {/* Objectives */}
      <div className="bg-white border-2 border-ink p-5 shadow-hard mb-6">
        <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-3">
          What You&apos;ll Learn
        </span>
        <ul className="space-y-1.5">
          {section.objectives.map((obj) => (
            <li key={obj} className="flex items-start gap-2 font-body text-sm text-gray-700">
              <span className="text-primary font-bold mt-0.5 flex-shrink-0">→</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Real contract link if present */}
      {section.realContractAddress && (
        <div className="mb-4">
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
            Real Deployed Contract
          </p>
          <ContractLink
            address={section.realContractAddress}
            chain={section.realContractChain}
          />
        </div>
      )}

      {/* Historical hack callout if present */}
      {section.historicalHack && (
        <HackCallout {...section.historicalHack} />
      )}

      <hr className="border-t-2 border-ink mt-8" />
    </header>
  );
}
