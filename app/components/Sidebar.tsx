"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CURRICULUM_SECTIONS } from "@/lib/curriculum";
import { useProgress } from "@/lib/useProgress";
import {
  BookOpen,
  Shield,
  Cpu,
  Code2,
  Layers,
  Wrench,
  FileSearch,
  Trophy,
  Users,
  Award,
  Home,
  ChevronRight,
  Search,
  Zap,
} from "lucide-react";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "evm-fundamentals": <Cpu size={18} />,
  "solidity-mastery": <Code2 size={18} />,
  "assembly-and-yul": <Layers size={18} />,
  "foundry-mastery": <Wrench size={18} />,
  "vulnerability-classes": <Shield size={18} />,
  "defi-attack-vectors": <Zap size={18} />,
  "static-analysis-tooling": <FileSearch size={18} />,
  "fuzzing-formal-verification": <BookOpen size={18} />,
  "writing-audit-reports": <FileSearch size={18} />,
  "bug-bounty-competitive-audits": <Trophy size={18} />,
};

const FOUNDATIONS = CURRICULUM_SECTIONS.filter(
  (s) => s.track === "foundations"
);
const SECURITY = CURRICULUM_SECTIONS.filter((s) => s.track === "security");

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: Props) {
  const pathname = usePathname();
  const { completed, percent } = useProgress();
  const [search, setSearch] = useState("");

  const filter = (title: string) =>
    title.toLowerCase().includes(search.toLowerCase());

  const navItem = (slug: string, title: string, stage: string) => {
    const active = pathname === `/curriculum/${slug}`;
    const done = completed.includes(slug);
    if (search && !filter(title)) return null;

    return (
      <Link
        key={slug}
        href={`/curriculum/${slug}`}
        className={[
          "nav-item flex items-center gap-3 px-3 py-3 font-heading font-bold text-xs uppercase tracking-wide border-2 mb-1 transition-all",
          active
            ? "bg-ink text-white border-ink"
            : "text-ink border-transparent hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:border-ink hover:shadow-hard",
        ].join(" ")}
        title={title}
      >
        <span className="flex-shrink-0 text-primary">
          {NAV_ICONS[slug] ?? <BookOpen size={18} />}
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate">
              {stage}: {title}
            </span>
            {done && (
              <span className="text-success text-sm font-mono ml-auto">✓</span>
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={[
          "fixed top-0 left-0 bottom-0 z-40 flex flex-col",
          "bg-[var(--sidebar-bg)] border-r-2 border-ink",
          "transition-[width] duration-300",
          collapsed ? "w-[72px]" : "w-[280px]",
          // mobile: off-canvas
          "max-md:translate-x-[-100%] max-md:data-[open=true]:translate-x-0",
        ].join(" ")}
        data-open="false"
      >
        {/* Logo row */}
        <div className="flex items-center h-16 px-4 border-b-2 border-ink flex-shrink-0">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 font-heading font-bold text-lg uppercase tracking-tight text-ink hover:text-primary transition-colors w-full"
            aria-label="Toggle sidebar"
          >
            <span className="flex-shrink-0 text-primary">
              <Shield size={26} />
            </span>
            {!collapsed && <span className="truncate">ChainCodeCamp</span>}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Search */}
          {!collapsed && (
            <div className="relative mb-6">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search curriculum..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border-2 border-ink pl-8 pr-3 py-2 font-mono text-xs outline-none focus:shadow-hard focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all"
              />
            </div>
          )}

          {/* Quick nav */}
          <Link
            href="/"
            className={[
              "nav-item flex items-center gap-3 px-3 py-3 font-heading font-bold text-xs uppercase tracking-wide border-2 mb-1 transition-all",
              pathname === "/"
                ? "bg-ink text-white border-ink"
                : "text-ink border-transparent hover:bg-white hover:border-ink hover:shadow-hard",
            ].join(" ")}
          >
            <Home size={18} className="flex-shrink-0 text-primary" />
            {!collapsed && <span>Home</span>}
          </Link>

          <Link
            href="/curriculum"
            className={[
              "nav-item flex items-center gap-3 px-3 py-3 font-heading font-bold text-xs uppercase tracking-wide border-2 mb-4 transition-all",
              pathname === "/curriculum"
                ? "bg-ink text-white border-ink"
                : "text-ink border-transparent hover:bg-white hover:border-ink hover:shadow-hard",
            ].join(" ")}
          >
            <BookOpen size={18} className="flex-shrink-0 text-primary" />
            {!collapsed && <span>Curriculum</span>}
          </Link>

          {/* Progress bar */}
          {!collapsed && (
            <div className="mb-6 px-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                  Progress
                </span>
                <span className="font-heading font-bold text-base text-ink">
                  {percent}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 border border-ink">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-gray-400 mt-1">
                {completed.length}/{CURRICULUM_SECTIONS.length} sections
              </p>
            </div>
          )}

          {/* Foundations */}
          {!collapsed && !search && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 px-3 mb-2">
              Foundations
            </p>
          )}
          {FOUNDATIONS.map((s) => navItem(s.slug, s.title, s.stage))}

          {/* Security */}
          {!collapsed && !search && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 px-3 mb-2 mt-6">
              Security & Auditing
            </p>
          )}
          {SECURITY.map((s) => navItem(s.slug, s.title, s.stage))}

          {/* Extra links */}
          {!collapsed && !search && (
            <div className="mt-6 border-t-2 border-ink pt-4">
              <Link
                href="/community"
                className="nav-item flex items-center gap-3 px-3 py-3 font-heading font-bold text-xs uppercase tracking-wide border-2 border-transparent mb-1 text-ink hover:bg-white hover:border-ink hover:shadow-hard transition-all"
              >
                <Users size={18} className="flex-shrink-0 text-primary" />
                Community
              </Link>
              <Link
                href="/certificate"
                className="nav-item flex items-center gap-3 px-3 py-3 font-heading font-bold text-xs uppercase tracking-wide border-2 border-transparent mb-1 text-ink hover:bg-white hover:border-ink hover:shadow-hard transition-all"
              >
                <Award size={18} className="flex-shrink-0 text-primary" />
                Certificate
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
