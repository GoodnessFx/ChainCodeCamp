"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  code: string;
  language: string;
}

// Small dependency-free tokenizer. Nigeria-first: no highlight library in
// the bundle. Heuristic only: strings, comments, numbers, keywords, calls.
const KEYWORDS: Record<string, string> = {
  solidity:
    "contract|interface|library|struct|enum|mapping|address|uint256|uint128|uint64|uint32|uint16|uint8|uint|int256|int|bytes32|bytes|string|bool|public|private|internal|external|payable|view|pure|returns|return|require|revert|emit|event|modifier|constructor|function|if|else|for|while|do|break|continue|new|delete|memory|storage|calldata|constant|immutable|virtual|override|import|pragma|assembly|try|catch|is|using|indexed|anonymous|unchecked|type|abstract|fallback|receive",
  bash:
    "if|then|else|fi|for|do|done|while|case|esac|function|return|export|source|local|echo|cd|sudo|curl|wget|npm|npx|node|git|forge|cast|anvil|chisel|pip|pipx|python3|python|docker|apt|brew|winget|wsl|chmod|mkdir|rm|mv|cp|cat|grep|PATH",
  js: "const|let|var|function|return|if|else|for|while|class|new|import|from|export|default|async|await|try|catch|finally|throw|typeof|instanceof|interface|type|extends|implements|this|undefined|null|true|false",
  json: "true|false|null",
};

function keywordSet(language: string): { pattern: string; hashComments: boolean } {
  const lang = language.toLowerCase();
  if (["bash", "sh", "shell", "console", "zsh", "powershell", "ps1"].includes(lang)) {
    return { pattern: KEYWORDS.bash, hashComments: true };
  }
  if (["json", "yaml", "yml", "toml", "ini"].includes(lang)) {
    return { pattern: KEYWORDS.json, hashComments: true };
  }
  if (["ts", "tsx", "js", "jsx", "javascript", "typescript"].includes(lang)) {
    return { pattern: KEYWORDS.js, hashComments: false };
  }
  return { pattern: KEYWORDS.solidity, hashComments: false };
}

const CLASS = {
  comment: "text-gray-500 italic",
  string: "text-[#7ee787]",
  number: "text-[#79c0ff]",
  keyword: "text-[#ff7b72]",
  fn: "text-[#d2a8ff]",
} as const;

function tokenize(code: string, language: string): ReactNode[] {
  const { pattern, hashComments } = keywordSet(language);
  const commentPart = hashComments ? "#[^\\n]*" : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  const re = new RegExp(
    [
      "(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
      `(${commentPart})`,
      "\\b(0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?)\\b",
      `\\b(${pattern})\\b`,
      "([A-Za-z_$][\\w$]*)(?=\\s*\\()",
    ].join("|"),
    "g"
  );

  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1]
      ? CLASS.string
      : m[2]
        ? CLASS.comment
        : m[3]
          ? CLASS.number
          : m[4]
            ? CLASS.keyword
            : CLASS.fn;
    out.push(
      <span key={i++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export default function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);
  const highlighted = useMemo(() => tokenize(code, language), [code, language]);

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
        <code className={`language-${language}`}>{highlighted}</code>
      </pre>
    </div>
  );
}
