import type { CurriculumSection } from "@/types/curriculum";

export const CURRICULUM_SECTIONS: CurriculumSection[] = [
  {
    slug: "evm-fundamentals",
    title: "EVM Fundamentals",
    stage: "01",
    track: "foundations",
    description:
      "How the EVM actually executes code. Stack, memory, storage, calldata, opcodes, and gas mechanics from first principles.",
    objectives: [
      "Understand the EVM execution model",
      "Know every data location and its cost",
      "Read raw opcode output from the compiler",
      "Identify gas cost hotspots before writing a line of Solidity",
    ],
    estimatedTime: "1–2 weeks",
    difficulty: "beginner",
    tags: ["evm", "opcodes", "gas", "stack", "memory", "storage"],
    realContractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    realContractChain: "Ethereum Mainnet",
  },
  {
    slug: "solidity-mastery",
    title: "Solidity Mastery",
    stage: "02",
    track: "foundations",
    description:
      "Not hello world. Production-grade Solidity from day one: storage packing, ABI encoding, custom errors, inheritance linearization, and the 24KB limit.",
    objectives: [
      "Pack storage slots to save 20,000 gas per avoided slot",
      "Write custom errors instead of string reverts",
      "Understand C3 linearization and inheritance order",
      "Use transient storage (EIP-1153) correctly",
    ],
    estimatedTime: "2–3 weeks",
    difficulty: "beginner",
    tags: ["solidity", "storage", "abi", "inheritance", "gas"],
    realContractAddress: "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
    realContractChain: "Ethereum Mainnet",
  },
  {
    slug: "assembly-and-yul",
    title: "Assembly & Yul",
    stage: "03",
    track: "foundations",
    description:
      "The differentiator. Drop into Yul when the compiler isn't enough. Memory layout, bitwise ops, custom dispatchers, and reading production assembly in OpenZeppelin and Solady.",
    objectives: [
      "Read and write inline Yul without guessing",
      "Manage the free memory pointer correctly",
      "Implement bit-masking for storage packing",
      "Understand dirty bits and why they break auth checks",
    ],
    estimatedTime: "2–3 weeks",
    difficulty: "intermediate",
    tags: ["yul", "assembly", "opcodes", "memory", "optimization"],
  },
  {
    slug: "foundry-mastery",
    title: "Foundry Mastery",
    stage: "04",
    track: "foundations",
    description:
      "The industry standard testing toolkit. Fuzz testing, invariant testing, fork tests, cheatcodes, gas snapshots, and deployment scripts — all in Solidity.",
    objectives: [
      "Write fuzz tests that catch edge cases unit tests miss",
      "Build handler-based invariant test suites",
      "Use vm.createFork for multi-chain test scenarios",
      "Generate gas snapshots and catch regressions in CI",
    ],
    estimatedTime: "1–2 weeks",
    difficulty: "intermediate",
    tags: ["foundry", "forge", "testing", "fuzzing", "invariants"],
  },
  {
    slug: "vulnerability-classes",
    title: "Common Vulnerability Classes",
    stage: "05",
    track: "security",
    description:
      "Reentrancy, access control, oracle manipulation, integer issues, flash loan attacks — each with a real historical hack as the case study, not a toy example.",
    objectives: [
      "Exploit and fix all classic reentrancy patterns",
      "Understand cross-function and read-only reentrancy",
      "Manipulate a spot price oracle with a flash loan",
      "Identify and protect against governance attacks",
    ],
    estimatedTime: "2–3 weeks",
    difficulty: "intermediate",
    tags: ["reentrancy", "access-control", "oracle", "flash-loans", "security"],
    historicalHack: {
      name: "The DAO",
      amount: "$60M",
      year: 2016,
      vector: "Recursive reentrancy via external call before state update",
    },
  },
  {
    slug: "defi-attack-vectors",
    title: "DeFi Attack Vectors",
    stage: "06",
    track: "security",
    description:
      "AMM manipulation, lending protocol exploits, MEV sandwich attacks, liquidation cascades, and ERC-4626 inflation attacks.",
    objectives: [
      "Model x*y=k and identify when it breaks under attack",
      "Simulate a liquidation cascade with real parameters",
      "Build a flash loan arbitrage bot for educational purposes",
      "Protect ERC-4626 vaults from first-depositor exploits",
    ],
    estimatedTime: "2–3 weeks",
    difficulty: "advanced",
    tags: ["defi", "amm", "lending", "mev", "liquidation"],
    historicalHack: {
      name: "Euler Finance",
      amount: "$197M",
      year: 2023,
      vector: "Missing health check in donate function",
    },
  },
  {
    slug: "static-analysis-tooling",
    title: "Static Analysis & Tooling",
    stage: "07",
    track: "security",
    description:
      "Slither, Foundry fuzzing, Echidna, Mythril — actual walkthroughs with real vulnerable contracts, not just install guides.",
    objectives: [
      "Run Slither and triage its output correctly",
      "Write Echidna properties for DeFi invariants",
      "Use Mythril for symbolic execution on target contracts",
      "Integrate static analysis into a CI pipeline",
    ],
    estimatedTime: "1–2 weeks",
    difficulty: "intermediate",
    tags: ["slither", "echidna", "mythril", "static-analysis", "ci"],
  },
  {
    slug: "fuzzing-formal-verification",
    title: "Fuzzing & Formal Verification",
    stage: "08",
    track: "security",
    description:
      "Go beyond unit tests. Property-based testing with Echidna, formal specs with Certora, and SMT solvers — the same tools used by MakerDAO and Aave.",
    objectives: [
      "Write stateful Echidna campaigns for lending protocols",
      "Express security properties in Certora CVL",
      "Understand R1CS and circuit constraints at a conceptual level",
      "Know when fuzzing is enough vs when you need formal proof",
    ],
    estimatedTime: "2 weeks",
    difficulty: "advanced",
    tags: ["fuzzing", "formal-verification", "certora", "echidna", "smt"],
  },
  {
    slug: "writing-audit-reports",
    title: "Writing a Real Audit Report",
    stage: "09",
    track: "security",
    description:
      "The part almost nobody teaches. Scope definition, severity classification (using industry-standard rubrics), PoC writing, client communication, and professional report formatting.",
    objectives: [
      "Scope an audit engagement correctly",
      "Classify findings by severity using OWASP + immunefi rubrics",
      "Write a PoC that reproduces the bug in Foundry",
      "Structure a report that wins future clients",
    ],
    estimatedTime: "1 week",
    difficulty: "intermediate",
    tags: ["audit", "report", "severity", "poc", "professional"],
  },
  {
    slug: "bug-bounty-competitive-audits",
    title: "Bug Bounty & Competitive Audits",
    stage: "10",
    track: "security",
    description:
      "Code4rena, Sherlock, Cantina — how submissions actually get judged, what separates winning reports from noise, and how to build a track record from zero.",
    objectives: [
      "Understand how C4 and Sherlock judge severity",
      "Read and learn from past winning reports",
      "Submit your first finding with confidence",
      "Track your competitive audit earnings and progress",
    ],
    estimatedTime: "Ongoing",
    difficulty: "advanced",
    tags: ["code4rena", "sherlock", "cantina", "bug-bounty", "competitive"],
  },
];

export function getSectionBySlug(slug: string): CurriculumSection | undefined {
  return CURRICULUM_SECTIONS.find((s) => s.slug === slug);
}

export function getSectionsByTrack(
  track: CurriculumSection["track"]
): CurriculumSection[] {
  return CURRICULUM_SECTIONS.filter((s) => s.track === track);
}

export const TOTAL_SECTIONS = CURRICULUM_SECTIONS.length;
