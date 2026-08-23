import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShellLayout from "@/components/ShellLayout";
import LessonContent from "@/components/lesson/LessonContent";
import LessonHeader from "@/components/lesson/LessonHeader";
import LessonNav from "@/components/lesson/LessonNav";
import { CURRICULUM_SECTIONS } from "@/lib/curriculum";
import { getLessonBySlug } from "@/lib/mdx";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return CURRICULUM_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = CURRICULUM_SECTIONS.find((s) => s.slug === params.slug);
  if (!section) return {};
  return {
    title: `${section.stage}: ${section.title}`,
    description: section.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const section = CURRICULUM_SECTIONS.find((s) => s.slug === params.slug);
  if (!section) notFound();

  const lesson = await getLessonBySlug(params.slug);
  const currentIndex = CURRICULUM_SECTIONS.findIndex(
    (s) => s.slug === params.slug
  );
  const prevSection = CURRICULUM_SECTIONS[currentIndex - 1] ?? null;
  const nextSection = CURRICULUM_SECTIONS[currentIndex + 1] ?? null;

  return (
    <ShellLayout>
      <article className="max-w-4xl mx-auto px-6 py-10">
        <LessonHeader section={section} currentIndex={currentIndex} />
        <LessonContent content={lesson.content} frontmatter={lesson.frontmatter} />
        <LessonNav
          slug={params.slug}
          prevSection={prevSection}
          nextSection={nextSection}
        />
      </article>
    </ShellLayout>
  );
}
