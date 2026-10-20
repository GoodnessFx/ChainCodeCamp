"use client";

import { CheckCircle2 } from "lucide-react";
import { SKILLS, isCovered } from "@/lib/skills";

export default function SkillMap({ completed }: { completed: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
      {SKILLS.map((s) => {
        const done = isCovered(s, completed);
        return (
          <div
            key={s.id}
            className={[
              "border-2 border-ink p-3",
              done ? "bg-[var(--primary-light)]" : "bg-white opacity-70",
            ].join(" ")}
          >
            <p className="flex items-center gap-2 font-heading text-xs font-bold uppercase">
              {done ? (
                <CheckCircle2 size={14} className="text-success flex-shrink-0" />
              ) : (
                <span className="h-3.5 w-3.5 flex-shrink-0 border-2 border-gray-300" />
              )}
              {s.label}
            </p>
            <p className="mt-1 font-mono text-[10px] text-gray-500">{s.hint}</p>
          </div>
        );
      })}
    </div>
  );
}
