/**
 * GitHub plumbing for the practice-repo flow. All browser state lives in
 * localStorage so the flow works with zero backend: a learner can connect
 * with a fine-grained personal access token today, and swap to Supabase
 * OAuth later without losing their configured repo.
 */

export interface PracticeRepo {
  owner: string;
  repo: string;
}

export interface LatestCommit {
  sha: string;
  shortSha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

const REPO_KEY = "ccc_practice_repo";
const TOKEN_KEY = "ccc_github_token";

function browser(): boolean {
  return typeof window !== "undefined";
}

export function getPracticeRepo(): PracticeRepo | null {
  if (!browser()) return null;
  try {
    const raw = localStorage.getItem(REPO_KEY);
    return raw ? (JSON.parse(raw) as PracticeRepo) : null;
  } catch {
    return null;
  }
}

export function setPracticeRepo(r: PracticeRepo): void {
  if (!browser()) return;
  localStorage.setItem(REPO_KEY, JSON.stringify(r));
  window.dispatchEvent(new Event("ccc_repo_updated"));
}

export function clearPracticeRepo(): void {
  if (!browser()) return;
  localStorage.removeItem(REPO_KEY);
  window.dispatchEvent(new Event("ccc_repo_updated"));
}

/** Fine-grained PAT with Contents + Metadata read, Contents write. */
export function getGitHubToken(): string | null {
  if (!browser()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setGitHubToken(token: string | null): void {
  if (!browser()) return;
  if (token && token.trim()) {
    localStorage.setItem(TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  window.dispatchEvent(new Event("ccc_repo_updated"));
}

export function repoUrl(r: PracticeRepo): string {
  return `https://github.com/${r.owner}/${r.repo}`;
}

export function cloneCommand(r: PracticeRepo): string {
  return `git clone https://github.com/${r.owner}/${r.repo}.git`;
}

async function gh<T>(path: string, token?: string | null, init?: RequestInit): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${body.slice(0, 160) || res.statusText}`);
  }
  return (await res.json()) as T;
}

interface CommitsApiItem {
  sha: string;
  html_url: string;
  commit: { message: string; author: { name: string; date: string } };
}

/** Latest commit on the repo default branch. Works without a token (rate-limited). */
export async function getLatestCommit(
  owner: string,
  repo: string,
  token?: string | null
): Promise<LatestCommit> {
  const items = await gh<CommitsApiItem[]>(
    `/repos/${owner}/${repo}/commits?per_page=1`,
    token
  );
  if (!items.length) throw new Error("No commits found. Push once first.");
  const c = items[0];
  return {
    sha: c.sha,
    shortSha: c.sha.slice(0, 7),
    message: c.commit.message.split("\n")[0],
    author: c.commit.author.name,
    date: c.commit.author.date,
    url: c.html_url,
  };
}

/** Creates a fresh private-by-default practice repo in the learner's account. */
export async function createPracticeRepo(
  token: string,
  name: string,
  description = "My ChainCodeCamp practice repo: PoCs, fixes and audit reports."
): Promise<PracticeRepo> {
  const created = await gh<{ owner: { login: string }; name: string; html_url: string }>(
    "/user/repos",
    token,
    {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        private: true,
        auto_init: true,
      }),
    }
  );
  return { owner: created.owner.login, repo: created.name };
}
