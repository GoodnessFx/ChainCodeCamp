import registry from "@/content/tools/registry.json";

export type OS = "windows" | "mac" | "linux";

export interface OsInstall {
  steps: string[];
  verify: string;
  expected: string;
}

export interface ToolStuck {
  problem: string;
  fix: string;
}

export interface Tool {
  id: string;
  name: string;
  category: "core" | "analysis" | "fuzzing" | "platform";
  what: string;
  why: string;
  official: string;
  lessons: string[];
  install: Record<OS, OsInstall>;
  stuck: ToolStuck[];
}

export const TOOLS: Tool[] = registry.tools as Tool[];

export const TOOL_CATEGORIES: { id: Tool["category"]; label: string; hint: string }[] = [
  { id: "core", label: "Step 1: Core setup", hint: "Install these first. Everything else depends on them." },
  { id: "analysis", label: "Step 2: Analysis tools", hint: "Static analyzers you run on any codebase before you read a line." },
  { id: "fuzzing", label: "Step 3: Fuzzing and proving", hint: "Property fuzzers and symbolic tools for the deep checks." },
  { id: "platform", label: "Step 4: Platforms", hint: "Explorers, debuggers, wallets and browser IDEs." },
];

export function getTool(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}

/** Aliases used when auto-linking tool names inside lesson text. */
export const TOOL_ALIASES: Record<string, string[]> = {
  vscode: ["VS Code"],
  git: ["Git"],
  node: ["Node.js", "Node"],
  wsl: ["WSL"],
  foundry: ["Foundry", "forge", "cast", "anvil", "chisel"],
  python: ["Python"],
  pipx: ["pipx"],
  slither: ["Slither"],
  aderyn: ["Aderyn"],
  echidna: ["Echidna"],
  medusa: ["Medusa"],
  halmos: ["Halmos"],
  certora: ["Certora", "CVL"],
  tenderly: ["Tenderly"],
  etherscan: ["Etherscan"],
  remix: ["Remix"],
  hardhat: ["Hardhat"],
  metamask: ["MetaMask"],
  github: ["GitHub"],
};

/** Every alias, longest first so "Node.js" wins over "Node". */
export const ALL_ALIASES: { alias: string; id: string }[] = Object.entries(TOOL_ALIASES)
  .flatMap(([id, aliases]) => aliases.map((alias) => ({ alias, id })))
  .sort((a, b) => b.alias.length - a.alias.length);

/** Best-effort OS detection from the browser. Falls back to windows (our majority). */
export function detectOS(): OS {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux") || ua.includes("android")) return "linux";
  return "windows";
}

export const OS_LABEL: Record<OS, string> = {
  windows: "Windows (with WSL)",
  mac: "Mac",
  linux: "Linux",
};
