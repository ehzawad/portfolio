export type CategoryId =
  | "agentic"
  | "tooling"
  | "language"
  | "vision"
  | "systems"
  | "products";

export type ActiveCategory = CategoryId | "all";

export interface Stat {
  label: string;
  value: string;
  detail: string;
}

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
  stats: Stat[];
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
  impact: number;
}

export interface PortfolioContent {
  profile: Profile;
  categories: Category[];
  projects: Project[];
  focusAreas: string[];
}
