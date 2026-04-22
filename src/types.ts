export type CategoryId =
  | "agentic"
  | "tooling"
  | "language"
  | "vision"
  | "systems"
  | "products";

export type ActiveCategory = CategoryId | "all";

export type GitHubMetadataSource = "github" | "cache" | "snapshot" | "fallback";

export type GitHubLoadStatus = "idle" | "loading" | "ready" | "error";

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  company: string;
  bio: string;
  avatarUrl: string;
  links: ProfileLink[];
}

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
  summary: string;
}

export interface Project {
  id: string;
  title: string;
  repo: string;
  url: string;
  category: CategoryId;
  language: string;
  year: string;
  description: string;
  evidence: string;
  tags: string[];
}

export interface PortfolioContent {
  profile: Profile;
  categories: Category[];
  projects: Project[];
  focusAreas: string[];
}

export interface GitHubProfileMetrics {
  login: string;
  name?: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  updatedAt?: string;
}

export interface RepositoryMetrics {
  repo: string;
  fullName: string;
  url: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  updatedAt?: string;
  pushedAt?: string;
  source: GitHubMetadataSource;
}

export interface GitHubPortfolioSnapshot {
  profile?: GitHubProfileMetrics;
  repos: Record<string, RepositoryMetrics>;
  fetchedAt?: string;
  source: GitHubMetadataSource;
  warning?: string;
  rateLimitRemaining?: number;
  rateLimitResetAt?: string;
}
