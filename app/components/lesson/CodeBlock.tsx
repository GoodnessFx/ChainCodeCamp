"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 border-2 border-ink shadow-hard">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-ink px-4 py-2">
        <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 font-mono text-xs text-white/70 hover:text-white transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* Code */}
      <pre className="!border-0 !shadow-none !mt-0 overflow-x-auto p-5 bg-[#0d1117] text-[#c9d1d9] text-sm leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
