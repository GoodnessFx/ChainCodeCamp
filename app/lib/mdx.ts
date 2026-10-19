import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LessonFrontmatter } from "@/types/curriculum";

const CURRICULUM_DIR = path.join(process.cwd(), "content", "curriculum");
const SECURITY_DIR = path.join(process.cwd(), "content", "security");

export async function getLessonBySlug(slug: string): Promise<{
  content: string;
  frontmatter: LessonFrontmatter;
}> {
  // Old lessons live in content/curriculum; the security track (P5+) lives in
  // content/security. Prefer curriculum so existing lessons keep working.
  const dirs = [CURRICULUM_DIR, SECURITY_DIR];
  for (const dir of dirs) {
    const filePath = path.join(dir, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { content, frontmatter: data as LessonFrontmatter };
    }
  }

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

