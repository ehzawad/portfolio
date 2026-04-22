import { ExternalLink, GitBranch, MapPin, RefreshCw } from "lucide-react";
import type {
  GitHubLoadStatus,
  GitHubPortfolioSnapshot,
  Profile,
} from "../../types";
import { formatCompactNumber, formatDateTime } from "../../utils/format";

interface ProfilePanelProps {
  profile: Profile;
  githubSnapshot: GitHubPortfolioSnapshot;
  githubStatus: GitHubLoadStatus;
  onRefreshGitHub: () => void;
}

function getSourceLabel(snapshot: GitHubPortfolioSnapshot, status: GitHubLoadStatus) {
  if (status === "loading") {
    return "Refreshing GitHub API";
  }

  if (snapshot.source === "github") {
    return "GitHub API live";
  }

  if (snapshot.source === "cache") {
    return "Local GitHub cache";
  }

  if (snapshot.source === "snapshot") {
    return "Bundled GitHub snapshot";
  }

  return "Static fallback";
}

export function ProfilePanel({
  profile,
  githubSnapshot,
  githubStatus,
  onRefreshGitHub,
}: ProfilePanelProps) {
  const avatarUrl = githubSnapshot.profile?.avatarUrl ?? profile.avatarUrl;
  const repoMetrics = Object.values(githubSnapshot.repos);
  const loadedRepoMetrics = repoMetrics.filter((repo) => repo.source !== "fallback");
  const featuredStars = loadedRepoMetrics.reduce((total, repo) => total + (repo.stars ?? 0), 0);
  const featuredForks = loadedRepoMetrics.reduce((total, repo) => total + (repo.forks ?? 0), 0);
  const warning = githubSnapshot.warning;

  return (
    <section className="profile-panel" aria-labelledby="profile-title">
      <div className="profile-copy">
        <div className="identity-row">
          <img
            src={avatarUrl}
            alt="GitHub avatar for ehzawad"
            className="avatar"
            width="80"
            height="80"
          />
          <div>
            <p className="eyebrow">AI systems portfolio</p>
            <h1 id="profile-title">{profile.name}</h1>
          </div>
        </div>

        <p className="role-line">
          {profile.role} at {profile.company}
        </p>
        <p className="bio">{profile.bio}</p>

        <div className="profile-meta" aria-label="Profile metadata">
          <span>
            <MapPin aria-hidden="true" size={17} />
            {profile.location}
          </span>
          <span role="status">{getSourceLabel(githubSnapshot, githubStatus)}</span>
          {warning ? <span role="status">{warning}</span> : null}
        </div>

        <div className="live-summary" aria-label="Live GitHub summary">
          <span>{formatCompactNumber(githubSnapshot.profile?.publicRepos)} public repos</span>
          <span>{formatCompactNumber(repoMetrics.length)} featured here</span>
          <span>{formatCompactNumber(featuredStars)} stars</span>
          <span>{formatCompactNumber(featuredForks)} forks</span>
          <span>Updated {formatDateTime(githubSnapshot.fetchedAt)}</span>
        </div>

        <div className="profile-actions" aria-label="Profile links">
          {profile.links.map((link) => {
            const isGithub = link.label.toLowerCase() === "github";

            return (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {isGithub ? <GitBranch aria-hidden="true" size={18} /> : <ExternalLink aria-hidden="true" size={18} />}
                {link.label}
              </a>
            );
          })}
          <button
            type="button"
            className="refresh-button"
            onClick={onRefreshGitHub}
            disabled={githubStatus === "loading"}
          >
            <RefreshCw aria-hidden="true" size={18} />
            {githubStatus === "loading" ? "Refreshing" : "Refresh GitHub"}
          </button>
        </div>
      </div>
    </section>
  );
}
