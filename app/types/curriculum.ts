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
}

export interface ProgressEntry {
  userId: string;
  slug: string;
  completedAt: string;
}
