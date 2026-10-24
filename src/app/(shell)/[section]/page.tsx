import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionView from "./SectionView";

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

/**
 * Environment Checker panel – shows per-OS install steps with copy buttons.
 */
function EnvCheckerPanel() {
  const osOptions = [
    { id: "windows", label: "Windows (with WSL)" },
    { id: "mac", label: "Mac (Homebrew)" },
    { id: "linux", label: "Linux (apt)" },
  ];
  const [os, setOs] = useState("windows");

  const installSteps: Record<string, string[]> = {
    windows: [
      "wsl --install",
      "curl -L https://foundry.paradigm.xyz | bash && foundryup",
      "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs",
      "pip3 install slither-analyzer",
    ],
    mac: [
      "brew install --cask docker",
      "brew install node",
      "curl -L https://foundry.paradigm.xyz | bash && foundryup",
      "pip3 install slither-analyzer",
    ],
    linux: [
      "sudo apt-get update && sudo apt-get install -y build-essential curl git python3 python3-pip",
      "curl -L https://foundry.paradigm.xyz | bash && foundryup",
      "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && sudo apt-get install -y nodejs",
      "pip3 install slither-analyzer",
    ],
  };

  return (
    <section className="border-2 border-zinc-800 rounded-xl p-6 bg-zinc-900 text-zinc-100 mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-brand">🖥️</span> Environment Checker
      </h2>
      <div className="flex gap-2 mb-4">
        {osOptions.map((o) => (
          <button
            key={o.id}
            onClick={() => setOs(o.id)}
            className={`text-sm px-3 py-1 rounded-md font-medium transition-colors ${
              os === o.id
                ? "bg-brand text-zinc-950"
                : "text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="border border-zinc-800 rounded-md p-4 bg-zinc-950/50 font-mono text-sm text-zinc-300">
        {installSteps[os].map((step, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="text-brand">{i + 1}.</span>
            <span className="truncate">{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const section = SECTIONS[params.section];
  return { title: section ? section.title : "Not found" };
}

export default function SectionPage({ params }: Props) {
  const section = SECTIONS[params.section];
  if (!section) notFound();

  return <SectionView section={params.section} title={section.title} blurb={section.blurb} />;
}

