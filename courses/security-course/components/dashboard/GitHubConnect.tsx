"use client";

import { useEffect, useState } from "react";
import {
  Github,
  Unplug,
  Plus,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  isAuthConfigured,
  getSessionUser,
  signInWithGitHub,
  signOut,
  type AuthUser,
} from "@/lib/auth";
import {
  getGitHubToken,
  setGitHubToken,
  getPracticeRepo,
  setPracticeRepo,
  clearPracticeRepo,
  createPracticeRepo,
  repoUrl,
  type PracticeRepo,
} from "@/lib/github";

export default function GitHubConnect() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [oauthBusy, setOauthBusy] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState(false);
  const [repo, setRepo] = useState<PracticeRepo | null>(null);
  const [ownerInput, setOwnerInput] = useState("");
  const [repoInput, setRepoInput] = useState("");
  const [newRepoName, setNewRepoName] = useState("ccc-practice");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const configured = isAuthConfigured();

  useEffect(() => {
    getSessionUser().then((u) => {
      setUser(u);
      setChecking(false);
    });
    setSavedToken(Boolean(getGitHubToken()));
    setRepo(getPracticeRepo());
    const refresh = () => {
      setSavedToken(Boolean(getGitHubToken()));
      setRepo(getPracticeRepo());
    };
    window.addEventListener("ccc_repo_updated", refresh);
    return () => window.removeEventListener("ccc_repo_updated", refresh);
  }, []);

  const connect = async () => {
    setOauthBusy(true);
    setOauthError(null);
    const { error } = await signInWithGitHub();
    if (error) {
      setOauthError(error);
      setOauthBusy(false);
    }
  };

  const disconnect = async () => {
    await signOut();
    setUser(null);
  };

  const saveToken = () => {
    setGitHubToken(token || null);
    setToken("");
  };

  const saveRepo = () => {
    const owner = ownerInput.trim();
    const name = repoInput.trim();
    if (owner && name) {
      setPracticeRepo({ owner, repo: name });
      setOwnerInput("");
      setRepoInput("");
    }
  };

  const createNow = async () => {
    const t = getGitHubToken();
    if (!t) {
      setCreateError("Save a token first, the API needs it to create the repo.");
      return;
    }
    setCreating(true);
    setCreateError(null);
    try {
      const created = await createPracticeRepo(t, newRepoName.trim() || "ccc-practice");
      setPracticeRepo(created);
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : "Repo creation failed.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="border-2 border-ink bg-white shadow-hard">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-ink px-4 py-2">
        <Github size={14} className="text-white/70" />
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
          GitHub
        </span>
        {user && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-[#7ee787]">
            Signed in as {user.userName ?? user.email ?? "learner"}
          </span>
        )}
      </div>

      <div className="space-y-5 p-4">
        {checking ? (
          <p className="font-mono text-xs text-gray-400">Checking session…</p>
        ) : user ? (
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-success" />
            <p className="font-body text-sm">
              Connected: <strong>{user.userName ?? user.email ?? user.id}</strong>
            </p>
            <button
              onClick={disconnect}
              className="ml-auto flex items-center gap-1.5 border-2 border-ink bg-white px-3 py-1.5 font-heading text-xs font-bold uppercase transition-all hover:shadow-hard"
            >
              <Unplug size={13} /> Disconnect
            </button>
          </div>
        ) : configured ? (
          <div>
            <button
              onClick={connect}
              disabled={oauthBusy}
              className="flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-white transition-all hover:shadow-hard disabled:opacity-50"
            >
              {oauthBusy ? <Loader2 size={14} className="animate-spin" /> : <Github size={14} />}
              Connect with GitHub
            </button>
            {oauthError && (
              <p className="mt-2 font-body text-xs text-error">{oauthError}</p>
            )}
          </div>
        ) : (
          <div className="border-l-4 border-secondary bg-blue-50 px-3 py-2">
            <p className="font-body text-xs text-gray-700">
              OAuth unlocks on the live site when Supabase is configured. On this
              machine the token below gives you the same repo and push-check power.
            </p>
          </div>
        )}

        <RepoSection
          repo={repo}
          savedToken={savedToken}
          token={token}
          setToken={setToken}
          saveToken={saveToken}
          ownerInput={ownerInput}
          setOwnerInput={setOwnerInput}
          repoInput={repoInput}
          setRepoInput={setRepoInput}
          saveRepo={saveRepo}
          newRepoName={newRepoName}
          setNewRepoName={setNewRepoName}
          creating={creating}
          createError={createError}
          createNow={createNow}
        />
      </div>
    </section>
  );
}
interface RepoProps {
  repo: PracticeRepo | null;
  savedToken: boolean;
  token: string;
  setToken: (v: string) => void;
  saveToken: () => void;
  ownerInput: string;
  setOwnerInput: (v: string) => void;
  repoInput: string;
  setRepoInput: (v: string) => void;
  saveRepo: () => void;
  newRepoName: string;
  setNewRepoName: (v: string) => void;
  creating: boolean;
  createError: string | null;
  createNow: () => void;
}

function RepoSection(p: RepoProps) {
  return (
    <>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
          Access token (this browser only)
        </p>
        {p.savedToken ? (
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-success" />
            <p className="font-body text-xs text-gray-700">
              Token saved. Repo creation and push checks use it.
            </p>
            <button
              onClick={() => setGitHubToken(null)}
              className="ml-auto font-mono text-xs text-error underline underline-offset-2"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <input
              type="password"
              value={p.token}
              onChange={(e) => p.setToken(e.target.value)}
              placeholder="github_pat_..."
              className="min-w-0 flex-1 border-2 border-ink bg-paper px-3 py-2 font-mono text-xs outline-none focus:shadow-hard"
            />
            <button
              onClick={p.saveToken}
              disabled={!p.token.trim()}
              className="border-2 border-ink bg-primary px-4 py-2 font-heading text-xs font-bold uppercase text-white transition-all hover:shadow-hard disabled:opacity-40"
            >
              Save token
            </button>
          </div>
        )}
        <p className="mt-2 font-mono text-[10px] text-gray-400">
          Fine-grained PAT, Contents read/write on the practice repo, Metadata read.
          Never commit it to git.
        </p>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
          Practice repo
        </p>
        {p.repo ? (
          <div className="flex flex-wrap items-center gap-3 border-2 border-ink bg-paper px-3 py-2">
            <CheckCircle2 size={16} className="text-success" />
            <a
              href={repoUrl(p.repo)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-secondary underline underline-offset-2"
            >
              {p.repo.owner}/{p.repo.repo} <ExternalLink size={11} />
            </a>
            <button
              onClick={() => clearPracticeRepo()}
              className="ml-auto font-mono text-xs text-error underline underline-offset-2"
            >
              Unlink
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <input
                value={p.newRepoName}
                onChange={(e) => p.setNewRepoName(e.target.value)}
                placeholder="ccc-practice"
                className="w-40 border-2 border-ink bg-paper px-3 py-2 font-mono text-xs outline-none focus:shadow-hard"
              />
              <button
                onClick={p.createNow}
                disabled={p.creating}
                className="flex items-center gap-1.5 border-2 border-ink bg-ink px-3 py-2 font-heading text-xs font-bold uppercase text-white transition-all hover:shadow-hard disabled:opacity-50"
              >
                {p.creating ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Create my practice repo
              </button>
            </div>
            {p.createError && (
              <p className="flex items-start gap-1.5 font-body text-xs text-error">
                <XCircle size={13} className="mt-0.5 flex-shrink-0" /> {p.createError}
              </p>
            )}
            <p className="font-mono text-[10px] text-gray-400">or link an existing one:</p>
            <div className="flex flex-wrap gap-2">
              <input
                value={p.ownerInput}
                onChange={(e) => p.setOwnerInput(e.target.value)}
                placeholder="owner"
                className="w-32 border-2 border-ink bg-paper px-3 py-2 font-mono text-xs outline-none focus:shadow-hard"
              />
              <input
                value={p.repoInput}
                onChange={(e) => p.setRepoInput(e.target.value)}
                placeholder="repo"
                className="w-40 border-2 border-ink bg-paper px-3 py-2 font-mono text-xs outline-none focus:shadow-hard"
              />
              <button
                onClick={p.saveRepo}
                disabled={!p.ownerInput.trim() || !p.repoInput.trim()}
                className="border-2 border-ink bg-white px-3 py-2 font-heading text-xs font-bold uppercase transition-all hover:shadow-hard disabled:opacity-40"
              >
                Link repo
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

