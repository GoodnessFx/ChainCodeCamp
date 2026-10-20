"use client";

import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";
import { getNote, setNote } from "@/lib/notes";

export default function LessonNotes({ slug }: { slug: string }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(getNote(slug));
  }, [slug]);

  const onChange = (value: string) => {
    setText(value);
    setSaved(false);
  };

  const save = () => {
    setNote(slug, text);
    setSaved(true);
  };

  return (
    <section className="my-10 border-2 border-ink bg-white shadow-hard">
      <div className="flex items-center gap-2 bg-ink px-4 py-2">
        <StickyNote size={14} className="text-white/70" />
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
          Your notes
        </span>
        {saved && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-[#7ee787]">
            Saved on this device
          </span>
        )}
      </div>
      <div className="p-4">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="What broke? What fixed it? Write it in your own words."
          className="w-full border-2 border-ink bg-paper px-3 py-2 font-body text-sm outline-none focus:shadow-hard transition-all"
        />
        <button
          onClick={save}
          className="mt-3 border-2 border-ink bg-primary px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-white shadow-hard transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:shadow-none"
        >
          Save note
        </button>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-gray-400">
          Notes live in this browser. They appear on your dashboard.
        </p>
      </div>
    </section>
  );
}
