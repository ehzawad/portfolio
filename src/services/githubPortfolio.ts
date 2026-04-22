import { bundledGitHubSnapshot } from "../data/githubSnapshot";
import type {
  GitHubPortfolioSnapshot,
  GitHubProfileMetrics,
  Project,
  RepositoryMetrics,
} from "../types";

const OWNER = import.meta.env.VITE_GITHUB_OWNER ?? "ehzawad";
const CACHE_KEY = `${OWNER}.portfolio.github.v2`;
const CACHE_TTL_MS = 10 * 60 * 1000;

interface GitHubRateLimit {
  remaining?: number;
  resetAt?: string;
}

interface GitHubFetchResult<T> {
  data: T;
  rateLimit: GitHubRateLimit;
}

interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

interface GitHubRepoResponse {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string | null;
}

interface LoadGitHubPortfolioOptions {
  force?: boolean;
  signal?: AbortSignal;
}

function buildFallbackRepo(project: Project): RepositoryMetrics {
  return {
    repo: project.repo,
    fullName: `${OWNER}/${project.repo}`,
    url: project.url,
    description: project.description,
    language: project.language,
    source: "fallback",
  };
}

function mergeWithFallbackRepos(
  projects: Project[],
  repos: Record<string, RepositoryMetrics>,
): Record<string, RepositoryMetrics> {
  return projects.reduce<Record<string, RepositoryMetrics>>((accumulator, project) => {
    accumulator[project.repo] = repos[project.repo] ?? buildFallbackRepo(project);
    return accumulator;
  }, {});
}

function toProfileMetrics(response: GitHubUserResponse): GitHubProfileMetrics {
  const avatarUrl = `${response.avatar_url}${response.avatar_url.includes("?") ? "&" : "?"}size=160`;

  return {
    login: response.login,
    name: response.name ?? undefined,
    avatarUrl,
    htmlUrl: response.html_url,
    publicRepos: response.public_repos,
    followers: response.followers,
    following: response.following,
    updatedAt: response.updated_at,
  };
}

function toRepositoryMetrics(
  response: GitHubRepoResponse,
  source: RepositoryMetrics["source"] = "github",
): RepositoryMetrics {
  return {
    repo: response.name,
    fullName: response.full_name,
    url: response.html_url,
    description: response.description ?? undefined,
    language: response.language ?? undefined,
    stars: response.stargazers_count,
    forks: response.forks_count,
    openIssues: response.open_issues_count,
    updatedAt: response.updated_at,
    pushedAt: response.pushed_at ?? response.updated_at,
    source,
  };
}

function getRateLimit(response: Response): GitHubRateLimit {
  const remainingHeader = response.headers.get("x-ratelimit-remaining");
  const resetHeader = response.headers.get("x-ratelimit-reset");
  const remaining = remainingHeader ? Number.parseInt(remainingHeader, 10) : undefined;
  const resetAt = resetHeader
    ? new Date(Number.parseInt(resetHeader, 10) * 1000).toISOString()
    : undefined;

  return {
    remaining: Number.isNaN(remaining) ? undefined : remaining,
    resetAt,
  };
}

async function fetchGitHubJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<GitHubFetchResult<T>> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal,
  });

  if (!response.ok) {
    const detail = response.status === 403 ? "rate limit or access denied" : response.statusText;
    throw new Error(`GitHub API ${response.status}: ${detail}`);
  }

  return {
    data: (await response.json()) as T,
    rateLimit: getRateLimit(response),
  };
}

function readCachedSnapshot(projects: Project[]): GitHubPortfolioSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cached = window.localStorage.getItem(CACHE_KEY);

    if (!cached) {
      return null;
    }

    const snapshot = JSON.parse(cached) as GitHubPortfolioSnapshot;

    if (!snapshot.fetchedAt) {
      return null;
    }

    const isFresh = Date.now() - new Date(snapshot.fetchedAt).getTime() < CACHE_TTL_MS;

    if (!isFresh) {
      return null;
    }

    return {
      ...snapshot,
      repos: mergeWithFallbackRepos(
        projects,
        Object.fromEntries(
          Object.entries(snapshot.repos).map(([repo, metrics]) => [
            repo,
            { ...metrics, source: "cache" as const },
          ]),
        ),
      ),
      source: "cache",
    };
  } catch {
    return null;
  }
}

function writeCachedSnapshot(snapshot: GitHubPortfolioSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
  } catch {
    // Cache failure should never block the portfolio.
  }
}

function toError(error: unknown) {
  return error instanceof Error ? error : new Error("GitHub metadata request failed.");
}

export function createFallbackGitHubSnapshot(
  projects: Project[],
  warning = "Using the bundled GitHub snapshot until live metadata refreshes.",
): GitHubPortfolioSnapshot {
  const snapshotRepos = Object.fromEntries(
    Object.entries(bundledGitHubSnapshot.repos).map(([repo, metrics]) => [
      repo,
      { ...metrics, source: "snapshot" as const },
    ]),
  );

  return {
    ...bundledGitHubSnapshot,
    repos: mergeWithFallbackRepos(projects, snapshotRepos),
    source: "snapshot",
    warning,
  };
}

export async function loadGitHubPortfolio(
  projects: Project[],
  options: LoadGitHubPortfolioOptions = {},
): Promise<GitHubPortfolioSnapshot> {
  if (!options.force) {
    const cached = readCachedSnapshot(projects);

    if (cached) {
      return cached;
    }
  }

  const profileResult: GitHubFetchResult<GitHubUserResponse> | Error = await fetchGitHubJson<GitHubUserResponse>(
    `/users/${OWNER}`,
    options.signal,
  ).catch(toError);

  const repoListResult: GitHubFetchResult<GitHubRepoResponse[]> | Error = await fetchGitHubJson<GitHubRepoResponse[]>(
    `/users/${OWNER}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
    options.signal,
  ).catch(toError);

  const repoMetrics: Record<string, RepositoryMetrics> = {};
  const rateLimits: GitHubRateLimit[] = [];

  if (!(repoListResult instanceof Error)) {
    rateLimits.push(repoListResult.rateLimit);

    for (const repo of repoListResult.data) {
      repoMetrics[repo.name] = toRepositoryMetrics(repo);
    }
  }

  const missingProjects = projects.filter((project) => !repoMetrics[project.repo]);

  const detailResults = await Promise.allSettled(
    missingProjects.map((project) =>
      fetchGitHubJson<GitHubRepoResponse>(`/repos/${OWNER}/${project.repo}`, options.signal),
    ),
  );

  for (const result of detailResults) {
    if (result.status === "fulfilled") {
      rateLimits.push(result.value.rateLimit);
      repoMetrics[result.value.data.name] = toRepositoryMetrics(result.value.data);
    }
  }

  const hasProfile = !(profileResult instanceof Error);
  const hasAnyRepo = Object.keys(repoMetrics).length > 0;

  if (!hasProfile && !hasAnyRepo) {
    throw profileResult instanceof Error
      ? profileResult
      : new Error("GitHub metadata could not be loaded.");
  }

  if (hasProfile) {
    rateLimits.push(profileResult.rateLimit);
  }

  const rateLimitRemaining = rateLimits
    .map((rateLimit) => rateLimit.remaining)
    .filter((remaining): remaining is number => typeof remaining === "number")
    .sort((a, b) => a - b)[0];

  const rateLimitResetAt = rateLimits
    .map((rateLimit) => rateLimit.resetAt)
    .filter((resetAt): resetAt is string => Boolean(resetAt))
    .sort()[0];

  const loadedRepoCount = projects.filter((project) => repoMetrics[project.repo]).length;
  const warning =
    loadedRepoCount < projects.length
      ? `${loadedRepoCount} of ${projects.length} featured repositories returned live metadata.`
      : undefined;

  const snapshot: GitHubPortfolioSnapshot = {
    profile: hasProfile ? toProfileMetrics(profileResult.data) : undefined,
    repos: mergeWithFallbackRepos(projects, repoMetrics),
    fetchedAt: new Date().toISOString(),
    source: "github",
    warning,
    rateLimitRemaining,
    rateLimitResetAt,
  };

  writeCachedSnapshot(snapshot);

  return snapshot;
}
