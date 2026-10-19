"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Wrench, X, CheckCircle2, Circle, ExternalLink, LifeBuoy } from "lucide-react";
import { getTool, detectOS, OS_LABEL, type OS } from "@/lib/tools";
import { getInstalledTools, toggleTool } from "@/lib/setup";

interface Props {
  id: string;
  children?: ReactNode;
}

export default function ToolTag({ id, children }: Props) {
  const tool = getTool(id);
  const [os, setOs] = useState<OS>("windows");
  const [open, setOpen] = useState(false);
  const [installed, setInstalled] = useState<string[]>([]);

  useEffect(() => {
    setOs(detectOS());
    setInstalled(getInstalledTools());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!tool) return <>{children ?? id}</>;

  const isOn = installed.includes(tool.id);
  const install = tool.install[os];

  return (
    <>
      <span className="relative inline-block group align-baseline">
        <button
          type="button"
          onClick={() => setOpen(true)}
          title={`How to install ${tool.name}`}
          className="font-mono text-[0.95em] text-ink border-b-2 border-dotted border-primary hover:bg-[var(--primary-light)] cursor-help px-0.5 transition-colors"
        >
          {children ?? tool.name}
        </button>
        <span className="pointer-events-none absolute left-0 top-full z-40 mt-1 hidden w-64 border-2 border-ink bg-white p-3 text-left shadow-hard group-hover:block">
          <span className="flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-primary">
            <Wrench size={12} /> How to install {tool.name}
          </span>
          <span className="mt-1 block font-body text-[11px] leading-snug text-gray-600">
            {tool.what}
          </span>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-gray-400">
            click to open install steps
          </span>
        </span>
      </span>
      {/* Install drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            aria-label="Close"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l-2 border-ink bg-paper">
            <header className="sticky top-0 flex items-start justify-between gap-3 border-b-2 border-ink bg-white px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  How to install
                </p>
                <h2 className="font-heading text-xl font-bold uppercase">{tool.name}</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="border-2 border-ink bg-white p-1.5 hover:shadow-hard"
                aria-label="Close install drawer"
              >
                <X size={16} />
              </button>
            </header>

            <div className="px-5 py-5">
              <p className="font-body text-sm leading-relaxed text-gray-700">{tool.what}</p>
              <p className="mt-3 border-l-4 border-primary bg-[var(--primary-light)] px-3 py-2 font-body text-sm text-gray-800">
                {tool.why}
              </p>

              <div className="mt-5">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                  Your OS: {OS_LABEL[os]}
                </p>
                <ol className="space-y-2">
                  {install.steps.map((s, i) => (
                    <li key={i} className="flex gap-2 font-body text-sm text-gray-800">
                      <span className="font-mono text-xs font-bold text-primary">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 border-2 border-ink bg-[#0d1117] p-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Verify
                </p>
                <pre className="mt-1 overflow-x-auto font-mono text-xs text-[#c9d1d9]">
                  {install.verify}
                </pre>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Expected output
                </p>
                <pre className="mt-1 overflow-x-auto font-mono text-xs text-[#7ee787]">
                  {install.expected}
                </pre>
              </div>

              <div className="mt-5 border-2 border-ink bg-white">
                <p className="flex items-center gap-2 border-b-2 border-ink bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white">
                  <LifeBuoy size={12} /> Stuck? The 3 usual suspects
                </p>
                <ul className="divide-y divide-gray-200">
                  {tool.stuck.map((s, i) => (
                    <li key={i} className="px-3 py-3">
                      <p className="font-heading text-xs font-bold uppercase text-error">
                        {s.problem}
                      </p>
                      <p className="mt-1 font-body text-xs leading-relaxed text-gray-700">{s.fix}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    toggleTool(tool.id);
                    setInstalled(getInstalledTools());
                  }}
                  className={[
                    "flex items-center gap-2 border-2 border-ink px-3 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-all",
                    isOn ? "bg-success text-white" : "bg-white hover:shadow-hard",
                  ].join(" ")}
                >
                  {isOn ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  {isOn ? "Installed" : "Mark as installed"}
                </button>
                <a
                  href={tool.official}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-secondary underline underline-offset-2"
                >
                  Official site <ExternalLink size={12} />
                </a>
                <Link
                  href="/setup"
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs text-secondary underline underline-offset-2"
                >
                  Open the Setup Hub
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
