"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight, Monitor, Apple, Terminal } from "lucide-react";
import ShellLayout from "@/components/ShellLayout";
import { TOOLS, TOOL_CATEGORIES, OS_LABEL, type OS, type Tool } from "@/lib/tools";
import { getInstalledTools, toggleTool, getSetupScore } from "@/lib/setup";

export default function SetupHubPage() {
  const [installed, setInstalled] = useState<string[]>([]);
  const [os, setOs] = useState<OS>("windows");

  useEffect(() => {
    const refresh = () => setInstalled(getInstalledTools());
    setInstalled(getInstalledTools());
    // Detect OS after mount so server and first client render match.
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("mac")) setOs("mac");
      else if (ua.includes("linux") || ua.includes("android")) setOs("linux");
    }
    window.addEventListener("ccc_setup_updated", refresh);
    return () => window.removeEventListener("ccc_setup_updated", refresh);
  }, []);

  const score = getSetupScore(installed);

  const osOptions: { id: OS; label: string; icon: React.ReactNode }[] = [
    { id: "windows", label: "Windows", icon: <Monitor size={14} /> },
    { id: "mac", label: "Mac", icon: <Apple size={14} /> },
    { id: "linux", label: "Linux", icon: <Terminal size={14} /> },
  ];

  return (
    <ShellLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-4">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
            Tool Hub
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mt-2 mb-4">
            Setup Hub
          </h1>
          <p className="font-body text-gray-600 max-w-2xl text-lg leading-relaxed">
            Every tool this course touches, how to install it on your machine, how to
            prove it works, and the three things that usually go wrong. Tick each one
            off as you go. Your score is saved on this device.
          </p>
        </div>

        <div className="bg-white border-2 border-ink p-6 shadow-hard mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
              Setup score
            </span>
            <span className="font-heading font-bold text-3xl">{score}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 border border-ink mb-3">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="font-mono text-xs text-gray-400">
            {installed.length}/{TOOLS.length} tools installed
            {score === 100 && " - machine fully armed. Go break something."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
            I am on:
          </span>
          {osOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => setOs(o.id)}
              className={[
                "flex items-center gap-2 border-2 border-ink px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-all",
                os === o.id ? "bg-ink text-white shadow-hard" : "bg-white hover:shadow-hard",
              ].join(" ")}
            >
              {o.icon} {o.label}
            </button>
          ))}
          <span className="font-mono text-xs text-gray-400">showing: {OS_LABEL[os]}</span>
        </div>

        {TOOL_CATEGORIES.map((cat) => {
          const tools = TOOLS.filter((t) => t.category === cat.id);
          if (tools.length === 0) return null;
          return (
            <section key={cat.id} className="mb-14">
              <h2 className="font-heading font-bold text-2xl md:text-3xl border-b-4 border-ink pb-2 inline-block">
                {cat.label}
              </h2>
              <p className="font-body text-gray-600 mt-2 mb-6 max-w-2xl">{cat.hint}</p>
              <div className="space-y-4">
                {tools.map((t) => (
                  <ToolCard
                    key={t.id}
                    tool={t}
                    os={os}
                    installed={installed.includes(t.id)}
                    onToggle={() => toggleTool(t.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <div className="border-2 border-ink bg-[var(--primary-light)] p-6">
          <p className="font-heading font-bold text-lg uppercase mb-2">Done with setup?</p>
          <p className="font-body text-sm text-gray-700 mb-4">
            Every lesson that mentions a tool shows the same install steps in a drawer,
            so you never lose your place. Next: the curriculum itself.
          </p>
          <Link href="/curriculum" className="btn btn-primary">
            Go to the curriculum <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </ShellLayout>
  );
}

function ToolCard({
  tool,
  os,
  installed,
  onToggle,
}: {
  tool: Tool;
  os: OS;
  installed: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const install = tool.install[os];

  return (
    <div className={["bg-white border-2 border-ink transition-all", installed ? "opacity-90" : ""].join(" ")}>
      <div className="flex items-start gap-4 p-4 md:p-5">
        <button
          onClick={onToggle}
          className="mt-0.5 flex-shrink-0"
          aria-label={installed ? `Mark ${tool.name} as not installed` : `Mark ${tool.name} as installed`}
        >
          {installed ? (
            <CheckCircle2 size={24} className="text-success" />
          ) : (
            <Circle size={24} className="text-gray-300 hover:text-primary" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading font-bold text-lg uppercase">{tool.name}</h3>
            {installed && (
              <span className="font-mono text-[10px] uppercase tracking-widest bg-success text-white border-2 border-ink px-2 py-0.5">
                Installed
              </span>
            )}
          </div>
          <p className="font-body text-sm text-gray-600 mt-1">{tool.what}</p>
          <p className="font-body text-sm text-gray-800 mt-2 border-l-4 border-primary pl-3">
            {tool.why}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="font-heading text-xs font-bold uppercase tracking-wide text-primary border-b-2 border-primary hover:bg-[var(--primary-light)]"
            >
              {open ? "Hide install steps" : "Show install steps"}
            </button>
            <a
              href={tool.official}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-secondary underline underline-offset-2"
            >
              Official site
            </a>
            {tool.lessons.length > 0 && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                used in {tool.lessons.length} lesson{tool.lessons.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink px-4 md:px-5 py-5 bg-paper">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Install on {OS_LABEL[os]}
          </p>
          <ol className="space-y-2 mb-4">
            {install.steps.map((s, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-gray-800">
                <span className="font-mono text-xs font-bold text-primary">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <div className="border-2 border-ink bg-[#0d1117] p-3 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Verify</p>
            <pre className="mt-1 overflow-x-auto font-mono text-xs text-[#c9d1d9]">{install.verify}</pre>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
              Expected output
            </p>
            <pre className="mt-1 overflow-x-auto font-mono text-xs text-[#7ee787]">{install.expected}</pre>
          </div>

          <div className="border-2 border-ink bg-white">
            <p className="border-b-2 border-ink bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white">
              Stuck? The 3 usual suspects
            </p>
            <ul className="divide-y divide-gray-200">
              {tool.stuck.map((s, i) => (
                <li key={i} className="px-3 py-3">
                  <p className="font-heading text-xs font-bold uppercase text-error">{s.problem}</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-gray-700">{s.fix}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
