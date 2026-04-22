import { ArrowUpRight, CircleDot, GitFork, Star, TimerReset } from "lucide-react";
import { useMemo } from "react";
import type {
  GitHubLoadStatus,
  GitHubPortfolioSnapshot,
  Project,
  RepositoryMetrics,
} from "../../types";
import { formatCompactNumber, formatDate, formatRelativeDate } from "../../utils/format";

interface RepositoryConsoleProps {
  projects: Project[];
  selectedProject: Project;
  githubSnapshot: GitHubPortfolioSnapshot;
  githubStatus: GitHubLoadStatus;
  onSelectProject: (project: Project) => void;
}

function getMetrics(
  snapshot: GitHubPortfolioSnapshot,
  project: Project,
): RepositoryMetrics | undefined {
  return snapshot.repos[project.repo];
}

function getActivityDate(metrics?: RepositoryMetrics) {
  return metrics?.pushedAt ?? metrics?.updatedAt;
}

function getSourceLabel(metrics?: RepositoryMetrics) {
  if (!metrics || metrics.source === "fallback") {
    return "offline";
  }

  if (metrics.source === "snapshot") {
    return "snapshot";
  }

  return metrics.source === "cache" ? "cached" : "live";
}

export function RepositoryConsole({
  projects,
  selectedProject,
  githubSnapshot,
  githubStatus,
  onSelectProject,
}: RepositoryConsoleProps) {
  const sortedProjects = useMemo(
    () =>
      [...projects].sort((first, second) => {
        const firstTime = new Date(getActivityDate(getMetrics(githubSnapshot, first)) ?? 0).getTime();
        const secondTime = new Date(getActivityDate(getMetrics(githubSnapshot, second)) ?? 0).getTime();
        return secondTime - firstTime;
      }),
    [githubSnapshot, projects],
  );

  const selectedMetrics = getMetrics(githubSnapshot, selectedProject);
  const selectedActivityDate = getActivityDate(selectedMetrics);
  const loadedCount = projects.filter((project) => {
    const metrics = getMetrics(githubSnapshot, project);
    return metrics && metrics.source !== "fallback";
  }).length;

  return (
    <section className="repo-console" aria-labelledby="repo-console-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GitHub activity</p>
          <h2 id="repo-console-title">Repository telemetry, fetched in-browser</h2>
        </div>
        <span>
          {githubStatus === "loading"
            ? "Refreshing metadata"
            : `${loadedCount}/${projects.length} repos with metadata`}
        </span>
      </div>

      <div className="repo-console-layout">
        <div className="repo-feed" aria-label="Repository activity selector">
          {sortedProjects.map((project) => {
            const metrics = getMetrics(githubSnapshot, project);
            const isActive = project.id === selectedProject.id;
            const activityDate = getActivityDate(metrics);

            return (
              <button
                type="button"
                key={project.id}
                className={isActive ? "repo-feed-item is-active" : "repo-feed-item"}
                aria-pressed={isActive}
                onClick={() => onSelectProject(project)}
              >
                <span className="repo-feed-main">
                  <span className="repo-name">{project.repo}</span>
                  <span className="repo-subline">
                    {metrics?.language ?? project.language} / updated{" "}
                    {formatRelativeDate(activityDate)}
                  </span>
                </span>
                <span className="repo-feed-stats" aria-label={`${project.repo} GitHub stats`}>
                  <span>
                    <Star aria-hidden="true" size={15} />
                    {formatCompactNumber(metrics?.stars)}
                  </span>
                  <span>
                    <GitFork aria-hidden="true" size={15} />
                    {formatCompactNumber(metrics?.forks)}
                  </span>
                  <span className={`source-dot source-dot-${getSourceLabel(metrics)}`}>
                    <CircleDot aria-hidden="true" size={14} />
                    {getSourceLabel(metrics)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <article className="project-inspector" aria-live="polite">
          <p className="inspector-category">
            {selectedMetrics?.language ?? selectedProject.language} / {selectedProject.year}
          </p>
          <h3>{selectedProject.title}</h3>
          <p>{selectedMetrics?.description ?? selectedProject.description}</p>

          <dl className="inspector-stats" aria-label={`${selectedProject.title} GitHub metadata`}>
            <div>
              <dt>Stars</dt>
              <dd>{formatCompactNumber(selectedMetrics?.stars)}</dd>
            </div>
            <div>
              <dt>Forks</dt>
              <dd>{formatCompactNumber(selectedMetrics?.forks)}</dd>
            </div>
            <div>
              <dt>Issues</dt>
              <dd>{formatCompactNumber(selectedMetrics?.openIssues)}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatDate(selectedActivityDate)}</dd>
            </div>
          </dl>

          <p className="evidence">{selectedProject.evidence}</p>
          <div className="tag-row">
            {selectedProject.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href={selectedProject.url} target="_blank" rel="noreferrer" className="inline-link">
            <TimerReset aria-hidden="true" size={17} />
            Inspect on GitHub
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </article>
      </div>
    </section>
  );
}
