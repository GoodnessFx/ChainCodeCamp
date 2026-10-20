import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { section: string };
}

const SECTIONS: Record<string, { title: string; blurb: string }> = {
  dashboard: { title: "Dashboard", blurb: "Your progress at a glance." },
  basics: {
    title: "Basics track",
    blurb: "Start from zero: transactions, contracts and security fundamentals. Lessons land here in Phase 3.",
  },
  core: {
    title: "Core course",
    blurb: "Reentrancy, oracles, access control and more, on your own machine. Lessons land here in Phase 3.",
  },
  notes: {
    title: "Notes",
    blurb: "Per-lesson notes, searchable and exportable as Markdown. The notes drawer lands in Phase 3.",
  },
  tools: {
    title: "Tools",
    blurb: "Environment checker and extension hub arrive in Phase 2 and Phase 6.",
  },
  community: {
    title: "Community",
    blurb: "GitHub Discussions and note sharing arrive in Phase 6.",
  },
};

export function generateMetadata({ params }: Props): Metadata {
  const section = SECTIONS[params.section];
  return { title: section ? section.title : "Not found" };
}

export default function SectionPage({ params }: Props) {
  const section = SECTIONS[params.section];
  if (!section) notFound();

  if (params.section === "dashboard") {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <section className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-1 text-lg font-semibold">Course progress</h2>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            0% complete. Progress starts moving the moment you finish your
            first checked lesson (Phase 3).
          </p>
          <div
            role="progressbar"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course progress"
            className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
          >
            <div className="h-full w-0 bg-brand" />
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/basics"
            className="rounded-xl border-2 border-zinc-200 bg-white p-5 hover:border-brand dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Beginner path
            </span>
            <p className="mt-1 text-lg font-bold">Start from zero →</p>
          </Link>
          <Link
            href="/core"
            className="rounded-xl border-2 border-zinc-200 bg-white p-5 hover:border-brand dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Experienced path
            </span>
            <p className="mt-1 text-lg font-bold">I know the basics →</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold">{section.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{section.blurb}</p>
    </div>
  );
}
