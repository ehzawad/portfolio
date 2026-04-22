import { ArrowUpRight, Plus } from "lucide-react";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type { Category, GitHubPortfolioSnapshot, Project } from "../../types";

interface ProjectGridProps {
  projects: Project[];
  categories: Category[];
  githubSnapshot: GitHubPortfolioSnapshot;
}

export function ProjectGrid({ projects, categories, githubSnapshot }: ProjectGridProps) {
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((event: MouseEvent<HTMLElement>, id: string) => {
    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      return;
    }
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  if (projects.length === 0) {
    return (
      <section className="empty-state" role="status">
        <h2>Nothing in this slice</h2>
        <p>No projects match the current filter.</p>
      </section>
    );
  }

  return (
    <section className="project-section" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Work</p>
          <h2 id="projects-title">Selected projects</h2>
        </div>
        <span>{projects.length} · tap a card</span>
      </div>

      <div className="project-grid">
        {projects.map((project) => {
          const metrics = githubSnapshot.repos[project.repo];
          const language = metrics?.language ?? project.language;
          const category = categoryById.get(project.category);
          const isExpanded = expandedId === project.id;

          return (
            <article
              key={project.id}
              className={isExpanded ? "project-card is-expanded" : "project-card"}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={(event) => handleToggle(event, project.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setExpandedId((current) => (current === project.id ? null : project.id));
                }
              }}
            >
              <div className="card-inner">
                <div className="project-card-top">
                  <span>{category?.shortLabel ?? "Work"}</span>
                  <span>{language}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="repo-handle">ehzawad / {project.repo}</p>

                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={isExpanded ? "card-reveal is-open" : "card-reveal"}>
                  <div className="card-reveal-body">
                    <p>{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open on GitHub
                      <ArrowUpRight aria-hidden="true" size={17} />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  className="card-toggle"
                  aria-expanded={isExpanded}
                  aria-controls={`${project.id}-reveal`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpandedId((current) => (current === project.id ? null : project.id));
                  }}
                >
                  <Plus aria-hidden="true" size={15} />
                  {isExpanded ? "Close" : "Details"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
