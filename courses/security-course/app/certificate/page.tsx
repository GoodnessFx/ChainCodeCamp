"use client";

import { useEffect, useState, useRef } from "react";
import ShellLayout from "@/components/ShellLayout";
import { CURRICULUM_SECTIONS, TOTAL_SECTIONS } from "@/lib/curriculum";
import { getCompletedSlugs } from "@/lib/progress";
import Link from "next/link";
import { Award, Download, Share2, CheckCircle2, Lock } from "lucide-react";

const TRACKS = [
  {
    id: "foundations",
    label: "Track 1: Foundations",
    slugs: CURRICULUM_SECTIONS.filter((s) => s.track === "foundations").map((s) => s.slug),
    sections: CURRICULUM_SECTIONS.filter((s) => s.track === "foundations"),
  },
  {
    id: "security",
    label: "Track 2: Security & Auditing",
    slugs: CURRICULUM_SECTIONS.filter((s) => s.track === "security").map((s) => s.slug),
    sections: CURRICULUM_SECTIONS.filter((s) => s.track === "security"),
  },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function generateVerificationId(slugs: string[]): string {
  // Deterministic ID based on completed slugs + date
  const seed = slugs.sort().join("-") + new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return "CCC-" + Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
}

interface CertificateCardProps {
  trackLabel: string;
  completedCount: number;
  totalCount: number;
  earnedDate: string;
  verificationId: string;
  unlocked: boolean;
}

function CertificateCard({
  trackLabel,
  completedCount,
  totalCount,
  earnedDate,
  verificationId,
  unlocked,
}: CertificateCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!unlocked) return;
    // Dynamic import to avoid SSR issues
    const html2canvas = (await import("html2canvas")).default;
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = `ChainCodeCamp-${verificationId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = () => {
    if (!unlocked) return;
    const text = `I completed ${trackLabel} on ChainCodeCamp — free smart contract security education. Verification: ${verificationId} https://chaincodecamp.dev/verify/${verificationId}`;
    if (navigator.share) {
      navigator.share({ title: "ChainCodeCamp Certificate", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Share text copied to clipboard!");
    }
  };

  return (
    <div className="mb-10">
      {/* The printable certificate */}
      <div
        ref={ref}
        className={[
          "relative bg-white border-[3px] border-ink p-10 shadow-hard-lg overflow-hidden",
          !unlocked ? "opacity-40 select-none" : "",
        ].join(" ")}
        style={{ minHeight: 320 }}
      >
        {/* Background dot grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#ff4d00 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Orange left stripe */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-primary" />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-mono text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
                Certificate of Completion
              </p>
              <h2 className="font-heading font-bold text-3xl">{trackLabel}</h2>
            </div>
            <Award size={48} className="text-primary opacity-80 flex-shrink-0" />
          </div>

          {/* Body */}
          <p className="font-heading font-semibold text-xl mb-2">
            This certifies the completion of all {totalCount} sections
          </p>
          <p className="font-body text-gray-600 text-sm mb-6">
            ChainCodeCamp — Free smart contract security education.
            Inspired by freeCodeCamp &amp; Cyfrin Updraft. Built different.
          </p>

          {/* Footer row */}
          <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t-2 border-ink">
            <div>
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Date Earned
              </p>
              <p className="font-heading font-bold text-sm">{earnedDate}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Verification ID
              </p>
              <p className="font-mono font-bold text-sm text-primary">{verificationId}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Verify at
              </p>
              <p className="font-mono text-xs text-secondary">
                chaincodecamp.dev/verify/{verificationId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator under certificate */}
      <div className="flex items-center gap-3 mt-4 px-1">
        <div className="flex-1 h-2 bg-gray-100 border border-ink">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-gray-500 flex-shrink-0">
          {completedCount}/{totalCount} sections
        </span>
      </div>

      {/* Action buttons */}
      {unlocked ? (
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={handleDownload} className="btn btn-primary text-sm gap-2">
            <Download size={16} /> Download PNG
          </button>
          <button onClick={handleShare} className="btn btn-outline text-sm gap-2">
            <Share2 size={16} /> Share
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 mt-4 bg-[var(--sidebar-bg)] border-2 border-ink px-4 py-3">
          <Lock size={16} className="text-gray-400 flex-shrink-0" />
          <p className="font-body text-sm text-gray-600">
            Complete all {totalCount} sections to unlock this certificate.{" "}
            <span className="font-bold text-ink">
              {totalCount - completedCount} section{totalCount - completedCount !== 1 ? "s" : ""} remaining.
            </span>
          </p>
          <Link href="/curriculum" className="btn btn-outline text-xs py-1.5 px-3 ml-auto flex-shrink-0">
            Continue →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CertificatePage() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setCompleted(getCompletedSlugs());
    refresh();
    window.addEventListener("ccc_progress_updated", refresh);
    return () => window.removeEventListener("ccc_progress_updated", refresh);
  }, []);

  const today = new Date();
  const earnedDate = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;
  const overallPercent = Math.round((completed.length / TOTAL_SECTIONS) * 100);

  return (
    <ShellLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Certifications
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Your Certificates
          </h1>
          <p className="font-body text-gray-600 text-lg max-w-2xl leading-relaxed">
            Free, verifiable proof of completion. Each certificate has a unique
            verification ID and a public URL. No paywall — ever.
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-white border-2 border-ink p-5 shadow-hard mb-12 flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[200px]">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">
              Overall Progress
            </p>
            <div className="w-full h-3 bg-gray-100 border border-ink">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="font-mono text-xs text-gray-400 mt-1">
              {completed.length}/{TOTAL_SECTIONS} sections — {overallPercent}%
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading font-bold text-4xl text-primary">{overallPercent}%</p>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">complete</p>
          </div>
        </div>

        {/* Completed sections checklist */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-5 border-b-2 border-ink pb-2">
            Section Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CURRICULUM_SECTIONS.map((s) => {
              const done = completed.includes(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={`/curriculum/${s.slug}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-ink no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all group"
                >
                  {done ? (
                    <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span className="font-mono text-xs text-gray-400 flex-shrink-0">{s.stage}</span>
                  <span className={`font-heading font-bold text-sm group-hover:text-primary transition-colors ${done ? "line-through text-gray-400" : ""}`}>
                    {s.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Track certificates */}
        <h2 className="font-heading font-bold text-2xl mb-8 border-b-2 border-ink pb-2">
          Track Certificates
        </h2>

        {TRACKS.map((track) => {
          const completedCount = track.slugs.filter((s) => completed.includes(s)).length;
          const unlocked = completedCount === track.slugs.length;
          const verificationId = generateVerificationId([...track.slugs, track.id]);

          return (
            <CertificateCard
              key={track.id}
              trackLabel={track.label}
              completedCount={completedCount}
              totalCount={track.slugs.length}
              earnedDate={earnedDate}
              verificationId={verificationId}
              unlocked={unlocked}
            />
          );
        })}

        {/* Verification note */}
        <div className="mt-6 bg-[var(--sidebar-bg)] border-2 border-ink p-5">
          <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            How Verification Works
          </p>
          <p className="font-body text-sm text-gray-600 leading-relaxed">
            Each certificate has a unique verification ID derived from your completed
            sections. Anyone can check{" "}
            <code className="font-mono text-xs bg-white border border-ink px-1">
              chaincodecamp.dev/verify/[ID]
            </code>{" "}
            to confirm the certificate is valid. No central database required —
            the ID encodes your completion state.
          </p>
        </div>
      </div>
    </ShellLayout>
  );
}
