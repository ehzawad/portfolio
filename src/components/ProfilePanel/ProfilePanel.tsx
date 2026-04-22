import { ExternalLink, GitBranch, MapPin } from "lucide-react";
import type { Profile } from "../../types";

interface ProfilePanelProps {
  profile: Profile;
  source: "static" | "firebase";
  warning?: string;
}

export function ProfilePanel({ profile, source, warning }: ProfilePanelProps) {
  return (
    <section className="profile-panel" aria-labelledby="profile-title">
      <div className="profile-copy">
        <div className="identity-row">
          <img src={profile.avatarUrl} alt="GitHub avatar for ehzawad" className="avatar" />
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
          <span>Data source: {source}</span>
          {warning ? <span role="status">Static fallback active</span> : null}
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
        </div>
      </div>

      <div className="metric-grid" aria-label="GitHub portfolio metrics">
        {profile.stats.map((stat) => (
          <article className="metric-tile" key={stat.label}>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
