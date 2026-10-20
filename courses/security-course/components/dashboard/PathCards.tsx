"use client";

import { CURRICULUM_SECTIONS } from "@/lib/curriculum";

const FOUNDATIONS = CURRICULUM_SECTIONS.filter((s) => s.track === "foundations");
const SECURITY = CURRICULUM_SECTIONS.filter((s) => s.track === "security");

export default function PathCards({ completed }: { completed: string[] }) {
  const foundDone = FOUNDATIONS.filter((s) => completed.includes(s.slug)).length;
  const secDone = SECURITY.filter((s) => completed.includes(s.slug)).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <PathCard level="Beginner" copy="Foundations: EVM to Foundry." done={foundDone} total={FOUNDATIONS.length} />
      <PathCard level="Auditor" copy="Security: vulns to reports." done={secDone} total={SECURITY.length} />
      <PathCard level="Pro" copy="Full curriculum plus portfolio." done={completed.length} total={CURRICULUM_SECTIONS.length} />
    </div>
  );
}

function PathCard({ level, copy, done, total }: { level: string; copy: string; done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const complete = total > 0 && done === total;
  return (
    <div className="border-2 border-ink bg-white p-4 shadow-hard">
      <p className="font-heading font-bold text-base uppercase">{level}</p>
      <p className="font-body text-xs text-gray-500 mt-1 mb-3">{copy}</p>
      <div className="w-full h-2 bg-gray-100 border border-ink mb-2">
        <div
          className={complete ? "h-full bg-success transition-all" : "h-full bg-primary transition-all"}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-mono text-xs text-gray-500">
        {done}/{total} {complete ? "- done" : "sections"}
      </p>
    </div>
  );
}
