"use client";

import Link from "next/link";
import { StickyNote } from "lucide-react";
import { CURRICULUM_SECTIONS } from "@/lib/curriculum";

export default function NotesList({ notes }: { notes: Record<string, string> }) {
  const entries = Object.entries(notes);
  if (entries.length === 0) {
    return (
      <p className="font-body text-sm text-gray-500 mb-4">
        No notes yet. Open any lesson and write one at the bottom of the page.
      </p>
    );
  }
  return (
    <div className="space-y-2 mb-4">
      {entries.map(([slug, text]) => {
        const section = CURRICULUM_SECTIONS.find((s) => s.slug === slug);
        return (
          <Link
            key={slug}
            href={`/curriculum/${slug}`}
            className="flex items-start gap-3 border-2 border-ink bg-white p-3 no-underline transition-all hover:shadow-hard"
          >
            <StickyNote size={16} className="mt-0.5 flex-shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="font-heading text-xs font-bold uppercase">
                {section ? `${section.stage}: ${section.title}` : slug}
              </p>
              <p className="truncate font-body text-xs text-gray-600">{text}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
