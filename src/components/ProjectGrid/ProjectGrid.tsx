import { ArrowUpRight, Clock3, GitFork, Star } from "lucide-react";
import type { Category, GitHubPortfolioSnapshot, Project } from "../../types";
import { formatCompactNumber, formatRelativeDate } from "../../utils/format";

interface ProjectGridProps {
  projects: Project[];
  categories: Category[];
  githubSnapshot: GitHubPortfolioSnapshot;
}

export function ProjectGrid({ projects, categories, githubSnapshot }: ProjectGridProps) {
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  if (projects.length === 0) {
    return (
      <section className="empty-state" role="status">
        <h2>No projects in this slice</h2>
        <p>The selected filter has no public authored repositories in the current portfolio snapshot.</p>
      </section>
    );
  }

  return (
    <section className="project-section" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Repository evidence</p>
          <h2 id="projects-title">Selected public authored work</h2>
        </div>
        <span>{projects.length} projects</span>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            {(() => {
              const metrics = githubSnapshot.repos[project.repo];
              const activityDate = metrics?.pushedAt ?? metrics?.updatedAt;
              const starsLabel =
                typeof metrics?.stars === "number"
                  ? `${formatCompactNumber(metrics.stars)} stars`
                  : "Stars unavailable";
              const forksLabel =
                typeof metrics?.forks === "number"
                  ? `${formatCompactNumber(metrics.forks)} forks`
                  : "Forks unavailable";

              return (
                <>
                  <div className="project-card-top">
                    <span>{categoryById.get(project.category)?.shortLabel}</span>
                    <span>{metrics?.language ?? project.language}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{metrics?.description ?? project.description}</p>
                  <p className="evidence">{project.evidence}</p>

                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-card-bottom">
                    <span aria-label={starsLabel}>
                      <Star aria-hidden="true" size={16} />
                      {formatCompactNumber(metrics?.stars)}
                    </span>
                    <span aria-label={forksLabel}>
                      <GitFork aria-hidden="true" size={16} />
                      {formatCompactNumber(metrics?.forks)}
                    </span>
                    <span aria-label={`Updated ${formatRelativeDate(activityDate)}`}>
                      <Clock3 aria-hidden="true" size={16} />
                      {formatRelativeDate(activityDate)}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.repo} on GitHub`}
                    >
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </a>
                  </div>
                </>
              );
            })()}
          </article>
        ))}
      </div>
    </section>
  );
}
