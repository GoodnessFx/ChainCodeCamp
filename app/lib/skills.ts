export interface Skill {
  id: string;
  label: string;
  hint: string;
  /** curriculum slugs that cover this skill */
  sections: string[];
}

export const SKILLS: Skill[] = [
  { id: "reentrancy", label: "Reentrancy", hint: "External call before state update", sections: ["vulnerability-classes"] },
  { id: "access-control", label: "Access Control", hint: "Missing or broken auth checks", sections: ["vulnerability-classes"] },
  { id: "oracles", label: "Oracle Manipulation", hint: "Spot price reads moved in one tx", sections: ["vulnerability-classes", "defi-attack-vectors"] },
  { id: "flash-loans", label: "Flash Loans", hint: "Atomic borrowed capital as attack fuel", sections: ["vulnerability-classes", "defi-attack-vectors"] },
  { id: "mev", label: "MEV and Front-running", hint: "Mempool games and ordering", sections: ["defi-attack-vectors"] },
  { id: "static-analysis", label: "Static Analysis", hint: "Slither, Aderyn, compiler warnings", sections: ["static-analysis-tooling"] },
  { id: "fuzzing", label: "Fuzzing and Invariants", hint: "Properties over random call sequences", sections: ["fuzzing-formal-verification", "foundry-mastery"] },
  { id: "reporting", label: "Audit Reporting", hint: "Severity, PoC, fix, client-ready writing", sections: ["writing-audit-reports"] },
  { id: "competitive", label: "Competitive Audits", hint: "Judged findings with working PoCs", sections: ["bug-bounty-competitive-audits"] },
];

export function isCovered(skill: Skill, completed: string[]): boolean {
  return skill.sections.some((s) => completed.includes(s));
}

export function coveredCount(completed: string[]): number {
  return SKILLS.filter((s) => isCovered(s, completed)).length;
}
