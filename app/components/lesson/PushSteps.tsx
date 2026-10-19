"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle2, XCircle, Loader2, Terminal, Copy, Check } from "lucide-react";
import {
  getPracticeRepo,
  getGitHubToken,
  getLatestCommit,
  repoUrl,
  type PracticeRepo,
  type LatestCommit,
} from "@/lib/github";

interface Props {
  slug: string;
  title: string;
}

/**
 * Per-lesson git flow: the exact add/commit/push commands plus a live
 * push check against the learner's linked practice repo. Without a linked
 * repo it still teaches the commands and points at the dashboard card.
 */
export default function PushSteps({ slug, title }: Props) {
  const [repo, setRepo] = useState<PracticeRepo | null>(null);
  const [checking, setChecking] = useState(false);
  const [commit, setCommit] = useState<LatestCommit | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    setRepo(getPracticeRepo());
    const refresh = () => setRepo(getPracticeRepo());
    window.addEventListener("ccc_repo_updated", refresh);
    return () => window.removeEventListener("ccc_repo_updated", refresh);
  }, []);

  const now = new Date().toISOString().slice(0, 10);
  const commands = [
    `git add -A`,
    `git commit -m "ccc(${slug}): ${title} — ${now}"`,
    `git push origin main`,
  ];

  const copyAll = async () => {
    await navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyOne = async (cmd: string, idx: number) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const runCheck = async () => {
    if (!repo) return;
    setChecking(true);
    setCheckError(null);
    setCommit(null);
    try {
      const latest = await getLatestCommit(repo.owner, repo.repo, getGitHubToken());
      setCommit(latest);
    } catch (e) {
      setCheckError(e instanceof Error ? e.message : "Push check failed.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="my-10 border-2 border-ink bg-white shadow-hard">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-ink px-4 py-2">
        <UploadCloud size={14} className="text-white/70" />
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
          Push your work
        </span>
      </div>

      <div className="p-4">
        <p className="font-body text-sm text-gray-700 mb-3">
          Every lesson ends the same way: prove it, commit it, push it. Run these in
          your practice repo after the quiz and challenge pass.
        </p>

        <div className="border-2 border-ink bg-[#0d1117]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
              <Terminal size={11} /> terminal
            </span>
            <button
              onClick={copyAll}
              className="flex items-center gap-1 font-mono text-[10px] text-white/60 hover:text-white"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy all"}
            </button>
          </div>
          {commands.map((cmd, i) => (
            <div
              key={i}
              className="group flex items-center gap-2 border-b border-white/5 px-3 py-2 last:border-0"
            >
              <span className="font-mono text-[10px] font-bold text-primary">{i + 1}.</span>
              <code className="flex-1 overflow-x-auto font-mono text-xs text-[#c9d1d9]">
                {cmd}
              </code>
              <button
                onClick={() => copyOne(cmd, i)}
                aria-label={`Copy command ${i + 1}`}
                className="font-mono text-[10px] text-white/40 hover:text-white"
              >
                {copiedIdx === i ? <Check size={11} /> : <Copy size={11} />}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          {!repo ? (
            <div className="border-l-4 border-primary bg-[var(--primary-light)] px-3 py-2">
              <p className="font-body text-xs text-gray-800">
                No practice repo linked yet. Link or create one on your{" "}
                <Link href="/dashboard" className="text-secondary underline underline-offset-2">
                  dashboard
                </Link>{" "}
                to unlock the push check.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={runCheck}
                disabled={checking}
                className="flex items-center gap-1.5 border-2 border-ink bg-primary px-4 py-2 font-heading text-xs font-bold uppercase text-white transition-all hover:shadow-hard disabled:opacity-50"
              >
                {checking ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                Push check
              </button>
              <a
                href={repoUrl(repo)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-secondary underline underline-offset-2"
              >
                {repo.owner}/{repo.repo}
              </a>
            </div>
          )}

          {checkError && (
            <p className="mt-3 flex items-start gap-1.5 font-body text-xs text-error">
              <XCircle size={13} className="mt-0.5 flex-shrink-0" /> {checkError}
            </p>
          )}

          {commit && (
            <div className="mt-3 border-2 border-success bg-green-50 px-3 py-2">
              <p className="flex items-center gap-1.5 font-heading text-xs font-bold uppercase text-success">
                <CheckCircle2 size={13} /> Push landed
              </p>
              <p className="mt-1 font-mono text-xs text-gray-800">
                {commit.shortSha} — {commit.message}
              </p>
              <p className="font-mono text-[10px] text-gray-500">
                {commit.author} · {commit.date.slice(0, 10)}
              </p>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-secondary underline underline-offset-2"
              >
                See it on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
