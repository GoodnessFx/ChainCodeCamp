"use client";

import Link from "next/link";
import {
  Layout,
  Container,
  Terminal,
  Copy,
  CheckCircle2,
} from "lucide-react";

/**
 * Open Lab button component used on every course page.
 * - "Open in GitHub Codespaces": codespaces URL carrying repo + branch
 * - "Run locally with Docker": copy-paste command + visual guide
 */
export default function OpenLabButton() {
  const repo = process.env.NEXT_PUBLIC_CODESPEACES_REPO || "GoodnessFx/ChainCodeCamp";
  const branch = process.env.NEXT_PUBLIC_CODESPEACES_BRANCH || "main";
  const codespacesUrl = `https://github.com/codespaces/new/${repo}?quickstart=1&branch=${branch}`;
  const repoEscaped = repo.replace("/", "%2F");

  return (
    <section className="border-2 border-zinc-800 rounded-xl p-6 bg-zinc-900 text-zinc-100">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-brand" />
          <h2 className="text-lg font-semibold">Open Lab</h2>
        </div>

        {/* GitHub Codespaces */}
        <div className="border-2 border-zinc-700 rounded-lg p-4 bg-zinc-950/50">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-white">Option 1: Open in Codespaces</span>
          </div>
          <Link
            href={codespacesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full border-2 border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-.89-.14-.45-.44-.81-.08-1.27.53-.36.98-.69 1.17-.86-1.43-.14-.34-.58-1.28-.14-2.62.38-.26.83-.7 1.3-.91-.9-.6-1.83-.9-2.95-.96-2.95-.31-.08-.62-.1-.95-.17a2.83 2.83 0 0 0-1.94.73a2.83 2.83 0 0 0-.76 1.92c0 .11.01.21.02.33.44.79.68 1.66.68 2.67 0 .34-.06.67-.14.99.45-.06.85-.23 1.25-.41a2.5 2.5 0 0 0-.33-.87c0-.11-.01-.22-.01-.33 0-.29.08-.56.22-.8a2 2 0 0 1 .53-.44c.63-.15 1.25-.22 1.87-.22.62 0 1.24.08 1.85.24.59-.16 1.03-.36 1.39-.52.37-.04.74-.12 1.1-.12a2.5 2.5 0 0 1 1.93.72c.45.44.75 1.08.75 1.87 0 .76-.43 1.44-1.09 1.92-.66.49-1.54.8-2.54.89-.43.07-.84.18-1.24.3a2 2 0 0 1-.1-.29c-.02-.07-.05-.14-.07-.21a5 5 0 0 1-.14-.45c-.03-.11-.06-.21-.08-.33 0-.12-.01-.23-.02-.34a2 2 0 0 1 .09-.59c.08-.38.26-.73.52-1.05.2-.37.48-.71.81-1 .55-.59 1.28-.98 2.08-.98.6 0 1.18.2 1.64.53a2.5 2.5 0 0 1 .75-1.28c0-.28-.07-.54-.14-.79-.07-.25-.17-.5-.29-.76-.23-.51-.56-.93-.98-1.3-.42-.37-.91-.64-1.44-.64-.64 0-1.18.28-1.61.71-.42.43-.67 1-.72 1.54-.06.55-.07 1.1-.07 1.65 0 .54.09 1.08.25 1.56.21.62.59 1.2 1.17 1.64.57.43 1.26.74 2.04.74.54 0 1.04-.17 1.5-.46.46-.29.88-.68 1.28-1.11.4-.43.74-.92 1-1.47.26-.55.41-1.13.44-1.71.03-.59-.04-1.17-.08-1.74 0-.17-.01-.34-.02-.51-.01-.17-.01-.34-.02-.52 0-.19-.01-.38-.02-.57a1 1 0 0 1 .05-.67c.14-.73 1.12-1.24 1.95-.78z" clip-rule="evenodd" />
            </svg>
            Open in Codespaces
          </Link>
        </div>

        {/* Local Docker */}
        <div className="border-2 border-zinc-700 rounded-lg p-4 bg-zinc-950/50">
          <div className="flex items-center gap-2 mb-3">
            <Container className="w-5 h-5 text-brand" />
            <span className="text-sm font-medium text-white">Option 2: Run locally with Docker</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="border border-zinc-800 rounded-md p-3 bg-zinc-950 w-full">
              <div className="flex items-center gap-1 mb-2 text-xs font-mono text-zinc-400">
                <span className="text-brand">$</span>
                <span>docker compose up</span>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Copy className="w-3 h-3" />
                Copy command
              </button>
            </div>
            <div className="text-sm text-zinc-500">
              <p className="mb-2">Step 1: Build and start</p>
              <p className="mb-2 text-sm text-zinc-400">
                Make sure Docker Desktop is running, then run:
              </p>
              <p className="mb-2">Step 2: Open your browser</p>
              <p className="text-sm text-zinc-400">Go to http://localhost:3000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}