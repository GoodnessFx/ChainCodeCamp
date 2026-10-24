"use client";

import { useState, useEffect } from "react";
import { Github, ExternalLink, RefreshCw, Copy, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import {
  getGitHubOAuthUrl,
  getGitHubUser,
  createPracticeRepo,
  getLatestCommit,
  type GitHubUser,
  type GitHubRepo,
} from "@/lib/github";

interface Props {
  onRepoCreated?: (repo: GitHubRepo) => void;
  onPushVerified?: (commit: { sha: string; message: string }) => void;
}

export default function GitHubConnect({
  onRepoCreated,
  onPushVerified,
}: Props = {}) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [repoName, setRepoName] = useState("ccc-practice-repo");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [latestCommit, setLatestCommit] = useState<any>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
  const CALLBACK_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("github_token");
    if (token) {
      setToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchGitHubUser(token);
    }
  }, []);

  const fetchGitHubUser = async (token: string) => {
    const user = await getGitHubUser(token);
    if (user) setUser(user);
    else setTokenError("Invalid GitHub token");
  };

  const connectWithGitHub = () => {
    const url = getGitHubOAuthUrl(CLIENT_ID, `${CALLBACK_URL}/auth/callback`);
    window.location.href = url;
  };

  const saveToken = () => {
    if (!token) return;
    localStorage.setItem("ccc_github_token", token);
    fetchGitHubUser(token);
  };

  const removeToken = () => {
    localStorage.removeItem("ccc_github_token");
    setToken("");
    setUser(null);
    setRepo(null);
    setTokenError(null);
  };

  const createRepo = async () => {
    if (!token) {
      setCreateError("Save a GitHub token first");
      return;
    }
    setCreating(true);
    setCreateError(null);
    try {
      const created = await createPracticeRepo(
        token,
        repoName.trim() || "ccc-practice-repo",
        "ChainCodeCamp practice repo - audit reports, PoCs, and fixes",
        "Cyfrin/security-and-auditing-full-course-s23"
      );
      if (created) {
        setRepo(created);
        if (onRepoCreated) onRepoCreated(created);
      } else {
        setCreateError("Failed to create practice repo");
      }
    } catch (e) {
      setCreateError(String(e));
    } finally {
      setCreating(false);
    }
  };

  const checkPush = async () => {
    if (!repo) {
      setCheckError("Create or link a practice repo first");
      return;
    }
    setChecking(true);
    setCheckError(null);
    try {
      const commit = await getLatestCommit(token || null, repo.owner.login, repo.name);
      if (commit) {
        setLatestCommit(commit);
        if (onPushVerified) onPushVerified(commit);
      } else {
        setCheckError("No commits found in practice repo");
      }
    } catch (e) {
      setCheckError(String(e));
    } finally {
      setChecking(false);
    }
  };

  const repoUrl = repo
    ? `https://github.com/${repo.owner.login}/${repo.name}`
    : undefined;

  return (
    <section className="border-2 border-zinc-800 rounded-xl p-6 bg-zinc-900 text-zinc-100 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-5 h-5 text-brand" />
        <h2 className="text-lg font-semibold">GitHub Connect</h2>
      </div>

      {!user && (!token || !CLIENT_ID) && (
        <div className="mb-6 p-4 border-2 border-zinc-700 rounded-md bg-zinc-950/50">
          <h3 className="text-sm font-medium text-zinc-100 mb-3">Connect GitHub</h3>
          <p className="text-xs text-zinc-400 mb-3">
            Connect your GitHub account to create practice repos, push PoCs,
            and verify your work lands on GitHub.
          </p>
          {!CLIENT_ID ? (
            <div className="text-xs text-zinc-500 italic">
              GitHub OAuth not configured. Set NEXT_PUBLIC_GITHUB_CLIENT_ID
              and NEXT_PUBLIC_GITHUB_CLIENT_SECRET env vars.
            </div>
          ) : (
            <button
              onClick={connectWithGitHub}
              className="flex items-center gap-2 w-full border-2 border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              Connect with GitHub
            </button>
          )}
        </div>
      )}

      {!user && token && !CLIENT_ID && (
        <div className="mb-6 p-4 border-2 border-zinc-700 rounded-md bg-zinc-950/50">
          <h3 className="text-sm font-medium text-zinc-100 mb-3">
            Access token (this browser only)
          </h3>
          <p className="text-xs text-zinc-400 mb-3">
            Create a fine-grained PAT at github.com/settings/tokens with repo
            scope, then paste it here:
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full rounded-md border-2 border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 focus-visible:border-brand"
            />
            <button
              onClick={saveToken}
              disabled={!token.trim()}
              className="px-3 py-2 text-xs font-medium text-zinc-950 bg-brand hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              Save token
            </button>
          </div>
          {tokenError && (
            <p className="mt-2 text-xs text-red-400">{tokenError}</p>
          )}
        </div>
      )}

      {user && (
        <div className="mb-6 p-4 border-2 border-zinc-700 rounded-md bg-zinc-800/50">
          <div className="flex items-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{user.login}</span>
          </div>
          <p className="text-xs text-zinc-400">Connected to GitHub</p>
          <button
            onClick={removeToken}
            className="text-xs text-zinc-400 hover:text-red-400 underline underline-offset-4"
          >
            Disconnect
          </button>
        </div>
      )}

      {(user || token) && (
        <div className="mb-6 p-4 border-2 border-zinc-700 rounded-md bg-zinc-800/50">
          <h3 className="text-sm font-medium text-zinc-100 mb-2">
            Create my practice repo
          </h3>
          <p className="text-xs text-zinc-400 mb-3">
            Fork the Cyfrin security course repo as your private practice repo
            for PoCs, fixes, and audit reports.
          </p>
          <div className="flex gap-2">
            <input
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="ccc-practice-repo"
              className="flex-1 rounded-md border-2 border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 focus-visible:border-brand"
            />
            <button
              onClick={createRepo}
              disabled={creating || !token}
              className="px-3 py-2 text-xs font-medium text-zinc-950 bg-brand hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create my practice repo"}
            </button>
          </div>
          {createError && (
            <p className="mt-2 text-xs text-red-400">{createError}</p>
          )}
        </div>
      )}

      {repo && (
        <div className="border-2 border-zinc-700 rounded-lg p-4 bg-zinc-950/50 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-medium text-zinc-100">
              Practice repo ready
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-zinc-400 truncate">
              {repo.owner.login}/{repo.name}
            </span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-xs text-brand underline underline-offset-2 hover:text-brand-dark"
            >
              Open on GitHub
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={checkPush}
              disabled={checking}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-950 bg-brand hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {checking ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              Push check
            </button>
          </div>

          {checkError && (
            <p className="mt-2 text-xs text-red-400">{checkError}</p>
          )}

          {latestCommit && (
            <div className="mt-4 border border-zinc-800 rounded-md p-3 bg-zinc-950">
              <p className="text-xs font-medium text-zinc-200 mb-1">
                Latest commit
              </p>
              <div className="flex items-start gap-2 text-xs font-mono text-zinc-300">
                <span className="text-zinc-500">{latestCommit.short_sha}</span>
                <span>{latestCommit.message}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {latestCommit.author} •{" "}
                {new Date(latestCommit.date).toLocaleDateString()}
              </p>
              <a
                href={latestCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                View commit on GitHub
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
}