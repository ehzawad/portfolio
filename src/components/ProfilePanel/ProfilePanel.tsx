import { ExternalLink, GitBranch, MapPin, RefreshCw } from "lucide-react";
import type {
  GitHubLoadStatus,
  GitHubPortfolioSnapshot,
  Profile,
} from "../../types";
import { formatCompactNumber, formatRelativeDate } from "../../utils/format";

interface ProfilePanelProps {
  profile: Profile;
  githubSnapshot: GitHubPortfolioSnapshot;
  githubStatus: GitHubLoadStatus;
  onRefreshGitHub: () => void;
}

function getStatusTone(snapshot: GitHubPortfolioSnapshot, status: GitHubLoadStatus) {
  if (status === "loading") {
    return "Syncing GitHub";
  }

  if (snapshot.source === "github") {
    return "Live from GitHub";
  }

  if (snapshot.source === "cache") {
    return "Cached from GitHub";
  }

  return "Snapshot";
}

export function ProfilePanel({
  profile,
  githubSnapshot,
  githubStatus,
  onRefreshGitHub,
}: ProfilePanelProps) {
  const avatarUrl = githubSnapshot.profile?.avatarUrl ?? profile.avatarUrl;
  const repoMetrics = Object.values(githubSnapshot.repos);
  const statusClass = `status-pill status-${githubStatus === "loading" ? "loading" : githubSnapshot.source}`;

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
            <p className="eyebrow">Portfolio</p>
            <h1 id="profile-title">{profile.name}</h1>
          </div>
        </div>

        <p className="role-line">
          <span>{profile.role}</span>
          <span className="role-divider" aria-hidden="true">·</span>
          <span>{profile.company}</span>
        </p>
        <p className="bio">{profile.bio}</p>

        <div className="profile-meta" aria-label="Profile metadata">
          <span>
            <MapPin aria-hidden="true" size={17} />
            {profile.location}
          </span>
          <span className={statusClass} role="status">
            <span className="status-dot" aria-hidden="true" />
            {getStatusTone(githubSnapshot, githubStatus)}
          </span>
          <span>
            Last push {formatRelativeDate(
              repoMetrics
                .map((repo) => repo.pushedAt ?? repo.updatedAt)
                .filter((value): value is string => Boolean(value))
                .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0],
            )}
          </span>
          <span>
            {formatCompactNumber(githubSnapshot.profile?.publicRepos)} public repos ·{" "}
            {repoMetrics.length} featured
          </span>
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
            {githubStatus === "loading" ? "Syncing" : "Refresh"}
          </button>
        </div>
      </div>
    </section>
  );
}
