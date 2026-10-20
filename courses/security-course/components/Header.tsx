"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Shield } from "lucide-react";
import { getCompletionCount } from "@/lib/progress";
import { TOTAL_SECTIONS } from "@/lib/curriculum";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Header({ collapsed, onToggle }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(getCompletionCount());
    refresh();
    window.addEventListener("ccc_progress_updated", refresh);
    return () => window.removeEventListener("ccc_progress_updated", refresh);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 bg-paper border-b-2 border-ink flex items-center justify-between px-6 transition-[left] duration-300"
      style={{ left: collapsed ? "72px" : "280px" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="p-2 bg-white border-2 border-ink hover:shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {collapsed && (
          <Link
            href="/"
            className="font-heading font-bold text-xl uppercase tracking-tight text-ink no-underline hover:text-primary hover:bg-transparent transition-colors"
          >
            ChainCodeCamp
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {count > 0 && (
          <span className="font-mono text-xs text-gray-400 hidden sm:inline">
            {count}/{TOTAL_SECTIONS} complete
          </span>
        )}
        <span className="bg-primary text-white border-2 border-ink text-xs font-bold px-3 py-1.5 uppercase tracking-wide shadow-[2px_2px_0px_#1a1a1a]">
          Mainnet Live
        </span>
        <Link
          href="/curriculum"
          className="btn btn-outline text-xs py-2 px-4 hidden md:flex"
        >
          Curriculum
        </Link>
      </div>
    </header>
  );
}
