"use client";

/**
 * Fix it panel: common errors and their exact fixes.
 * Used by the Environment Checker page (Phase 2).
 */
export default function FixItPanel() {
  const fixes = [
    {
      problem: "'forge' is not recognized",
      fix:
        "Run: curl -L https://foundry.paradigm.xyz | bash && foundryup",
      detail: "Foundry is not installed or not on PATH. Restart your terminal after installing.",
    },
    {
      problem: "'docker' is not recognized",
      fix: "Install Docker Desktop: https://www.docker.com/products/docker-desktop/",
      detail: "Docker Desktop must be installed and running.",
    },
    {
      problem: "Port 3000 already in use",
      fix: "Run: npx kill-port 3000",
      detail: "Another process is using port 3000. Kill it and restart.",
    },
    {
      problem: "forge build fails",
      fix: "Run: forge install && forge build",
      detail: "Dependencies may not be installed. Run forge install first.",
    },
    {
      problem: "slither: command not found",
      fix: "Run: pip3 install slither-analyzer",
      detail: "Slither requires Python 3 and pip.",
    },
    {
      problem: "Cannot clone Cyfrin course repo",
      fix: "Run: git submodule update --init --recursive",
      detail: "The course repo is a git submodule. Initialize it first.",
    },
    {
      problem: "npm run dev fails with memory error",
      fix: "Run: NODE_OPTIONS=--max-old-space-size=3072 npm run dev",
      detail: "Node.js needs more memory for the build.",
    },
  ];

  return (
    <section className="border-2 border-zinc-800 rounded-xl p-6 bg-zinc-900 text-zinc-100 mt-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-brand">🛠️</span> Fix it panel
      </h2>
      <p className="text-sm text-zinc-400 mb-4">
        Common errors and their exact fixes
      </p>
      <div className="space-y-3">
        {fixes.map((f, i) => (
          <div
            key={i}
            className="border border-zinc-800 rounded-md p-3 bg-zinc-950/50"
          >
            <p className="text-sm font-medium text-zinc-200 mb-1">{f.problem}</p>
            <div className="flex items-start gap-2 text-xs">
              <span className="font-mono text-zinc-400">$</span>
              <span className="font-mono text-green-400">{f.fix}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}