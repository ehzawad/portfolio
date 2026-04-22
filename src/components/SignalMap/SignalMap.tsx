import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "../../types";

interface SignalMapProps {
  projects: Project[];
  selectedProject: Project;
  onSelectProject: (project: Project) => void;
}

export function SignalMap({ projects, selectedProject, onSelectProject }: SignalMapProps) {
  const visibleNodes = projects.slice(0, 18);

  return (
    <section className="signal-map" aria-labelledby="signal-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Signal map</p>
          <h2 id="signal-title">Impact-weighted public work</h2>
        </div>
        <span>{visibleNodes.length} visible repos</span>
      </div>

      <div className="signal-layout">
        <div className="node-grid" aria-label="Repository signal selector">
          {visibleNodes.map((project) => {
            const isActive = project.id === selectedProject.id;

            return (
              <button
                type="button"
                key={project.id}
                className={isActive ? "signal-node is-active" : "signal-node"}
                style={{ "--impact": `${Math.max(project.impact, 50)}%` } as CSSProperties}
                aria-pressed={isActive}
                aria-label={`Select ${project.title}`}
                onClick={() => onSelectProject(project)}
              >
                <span>{project.repo.slice(0, 2).toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        <article className="project-inspector" aria-live="polite">
          <p className="inspector-category">{selectedProject.language} / {selectedProject.year}</p>
          <h3>{selectedProject.title}</h3>
          <p>{selectedProject.description}</p>
          <p className="evidence">{selectedProject.evidence}</p>
          <div className="tag-row">
            {selectedProject.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href={selectedProject.url} target="_blank" rel="noreferrer" className="inline-link">
            Open repository
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </article>
      </div>
    </section>
  );
}
