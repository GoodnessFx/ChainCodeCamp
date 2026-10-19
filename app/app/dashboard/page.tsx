"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Target, Trophy } from "lucide-react";
import ShellLayout from "@/components/ShellLayout";
import { CURRICULUM_SECTIONS } from "@/lib/curriculum";
import { useProgress } from "@/lib/useProgress";
import { getSetupScore, getInstalledTools } from "@/lib/setup";
import { getNotes } from "@/lib/notes";
import { touchStreak, currentStreak, totalActiveDays } from "@/lib/streak";
import { SKILLS, isCovered } from "@/lib/skills";
import SkillMap from "@/components/dashboard/SkillMap";
import PathCards from "@/components/dashboard/PathCards";
import NotesList from "@/components/dashboard/NotesList";
import GitHubConnect from "@/components/dashboard/GitHubConnect";

export default function DashboardPage() {
  const { completed } = useProgress();
  const [setupPct, setSetupPct] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeDays, setActiveDays] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [toolsCount, setToolsCount] = useState(0);

  useEffect(() => {
    setSetupPct(getSetupScore());
    setToolsCount(getInstalledTools().length);
    setStreak(touchStreak());
    setActiveDays(totalActiveDays());
    setNotes(getNotes());
    const onSetup = () => {
      setSetupPct(getSetupScore());
      setToolsCount(getInstalledTools().length);
    };
    const onNotes = () => setNotes(getNotes());
    window.addEventListener("ccc_setup_updated", onSetup);
    window.addEventListener("ccc_notes_updated", onNotes);
    return () => {
      window.removeEventListener("ccc_setup_updated", onSetup);
      window.removeEventListener("ccc_notes_updated", onNotes);
    };
  }, []);

  const nextSection = CURRICULUM_SECTIONS.find((s) => !completed.includes(s.slug)) ?? null;
  const covered = SKILLS.filter((s) => isCovered(s, completed)).length;

  return (
    <ShellLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-4">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
            Dashboard
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-2 mb-2">
            Your audit trail
          </h1>
          <p className="flex flex-wrap items-center gap-4 font-mono text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Flame size={14} className={streak > 0 ? "text-primary" : "text-gray-300"} />
              {streak} day streak
            </span>
            <span>{activeDays} active days</span>
            <span>{covered}/{SKILLS.length} bug classes covered</span>
          </p>
        </div>

        {nextSection ? (
          <Link
            href={`/curriculum/${nextSection.slug}`}
            className="mb-8 flex items-center gap-4 border-2 border-ink bg-white p-5 shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 no-underline"
          >
            <Target size={24} className="flex-shrink-0 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                Continue where you left off
              </p>
              <p className="font-heading font-bold text-lg truncate">
                {nextSection.stage}: {nextSection.title}
              </p>
            </div>
            <ArrowRight size={18} className="flex-shrink-0 text-gray-400" />
          </Link>
        ) : (
          <div className="mb-8 flex items-center gap-4 border-2 border-ink bg-[var(--primary-light)] p-5 shadow-hard">
            <Trophy size={24} className="flex-shrink-0 text-primary" />
            <p className="font-heading font-bold text-lg">
              All {CURRICULUM_SECTIONS.length} sections complete. Claim your certificate.
            </p>
          </div>
        )}

        <h2 className="font-heading font-bold text-2xl mb-4">Learn path</h2>
        <PathCards completed={completed} />

        <h2 className="font-heading font-bold text-2xl mb-4">Skill map</h2>
        <SkillMap completed={completed} />

        <h2 className="font-heading font-bold text-2xl mb-4">Setup</h2>
        <Link
          href="/setup"
          className="mb-10 block border-2 border-ink bg-white p-5 shadow-hard no-underline"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-heading font-bold text-lg">Setup score: {setupPct}%</span>
            <span className="font-mono text-xs text-gray-400">{toolsCount} tools installed</span>
          </div>
          <div className="w-full h-3 bg-gray-100 border border-ink">
            <div className="h-full bg-secondary transition-all" style={{ width: `${setupPct}%` }} />
          </div>
        </Link>

        <h2 className="font-heading font-bold text-2xl mb-4">Your notes</h2>
        <NotesList notes={notes} />

        <h2 className="font-heading font-bold text-2xl mb-4">GitHub</h2>
        <div className="mb-4">
          <GitHubConnect />
        </div>
      </div>
    </ShellLayout>
  );
}
