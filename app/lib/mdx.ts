import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LessonFrontmatter } from "@/types/curriculum";

const CONTENT_DIR = path.join(process.cwd(), "content", "curriculum");

export async function getLessonBySlug(slug: string): Promise<{
  content: string;
  frontmatter: LessonFrontmatter;
}> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Return stub content if MDX file doesn't exist yet
    return {
      content: `## Coming Soon\n\nThis section is being written. Check back soon.`,
      frontmatter: {
        title: slug,
        stage: "00",
        track: "foundations",
        description: "",
        estimatedTime: "TBD",
        difficulty: "beginner",
        objectives: [],
      },
    };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    content,
    frontmatter: data as LessonFrontmatter,
  };
}
