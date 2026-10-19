export interface CurriculumSection {
  slug: string;
  title: string;
  stage: string; // e.g. "01"
  track: "foundations" | "security" | "advanced";
  description: string;
  objectives: string[];
  estimatedTime: string; // e.g. "2 weeks"
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  realContractAddress?: string;
  realContractChain?: string;
  historicalHack?: {
    name: string;
    amount: string;
    year: number;
    vector: string;
  };
}

export interface LessonQuestion {
  q: string;
  options: string[];
  /** index into options */
  answer: number;
  /** short explanation shown after checking */
  why?: string;
}

export interface LessonFrontmatter {
  title: string;
  stage: string;
  track: string;
  description: string;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  objectives: string[];
  tags?: string[];
  realContractAddress?: string;
  historicalHack?: {
    name: string;
    amount: string;
    year: number;
    vector: string;
  };
  // P2 lesson-format fields. All optional so existing lessons keep rendering.
  /** one-line goal, rendered as a GoalLine above the body */
  goal?: string;
  /** URL of the lesson diagram (Excalidraw export or image), lazy loaded */
  diagram?: string;
  /** tool ids from content/tools/registry.json used by this lesson */
  tools?: string[];
  /** "Watch the video version" link to the matching Cyfrin Updraft lesson */
  videoUrl?: string;
  videoTitle?: string;
  /** practice/audit repo the lesson clones (content/security/repos.json) */
  repo?: string;
  /** graded quiz rendered after the body when present */
  quiz?: LessonQuestion[];
}

export interface ProgressEntry {
  userId: string;
  slug: string;
  completedAt: string;
}
