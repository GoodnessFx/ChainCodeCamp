/**
 * GitHub OAuth + practice repo helpers.
 * Connects to GitHub OAuth, creates practice repos from Cyfrin templates,
 * and runs push checks against the latest commit.
 */

export interface GitHubUser {
  login: string;
  name?: string;
  avatar_url?: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  clone_url: string;
  owner: { login: string };
}

export interface LatestCommit {
  sha: string;
  short_sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

const GITHUB_API = "https://api.github.com";

/**
 * Build the GitHub OAuth authorization URL.
 */
export function getGitHubOAuthUrl(clientId: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo user read:user",
    state: Math.random().toString(36).substring(7),
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange an OAuth code for an access token.
 */
export async function exchangeOAuthCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ access_token: string } | null> {
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });
    if (!res.ok) return null;
    return (await res.json()) as { access_token: string };
  } catch {
    return null;
  }
}

/**
 * Get the authenticated GitHub user.
 */
export async function getGitHubUser(accessToken: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/user`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

/**
 * Create a practice repo from a Cyfrin template.
 */
export async function createPracticeRepo(
  accessToken: string,
  repoName: string,
  description: string,
  templateRepo: string
): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`${GITHUB_API}/orgs/Cyfrin/repos`, {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        name: repoName,
        description: description || `ChainCodeCamp practice repo forked from ${templateRepo}`,
        private: true,
        template_repository: templateRepo,
      }),
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubRepo;
  } catch {
    return null;
  }
}

/**
 * Get the latest commit on the default branch of a repo.
 */
export async function getLatestCommit(
  accessToken: string | null,
  owner: string,
  repo: string
): Promise<LatestCommit | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (accessToken) headers.Authorization = `token ${accessToken}`;

    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=1`, {
      headers,
    });
    if (!res.ok) return null;

    const data = (await res.json()) as any[];
    if (!data || data.length === 0) return null;

    const c = data[0];
    return {
      sha: c.sha,
      short_sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      author: c.commit.author.name || "unknown",
      date: c.commit.author.date,
      url: c.html_url,
    };
  } catch {
    return null;
  }
}

/**
 * Get the list of repos for the authenticated user.
 */
export async function getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${GITHUB_API}/user/repos?per_page=100`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return [];
    return (await res.json()) as GitHubRepo[];
  } catch {
    return [];
  }
}