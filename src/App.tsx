import { useEffect, useMemo, useState } from "react";
import { CategoryRail } from "./components/CategoryRail/CategoryRail";
import { FocusStrip } from "./components/FocusStrip/FocusStrip";
import { ProfilePanel } from "./components/ProfilePanel/ProfilePanel";
import { ProjectGrid } from "./components/ProjectGrid/ProjectGrid";
import { SignalMap } from "./components/SignalMap/SignalMap";
import { portfolioContent } from "./data/portfolio";
import { loadPortfolioContent } from "./services/portfolioSource";
import type { ActiveCategory, CategoryId, PortfolioContent, Project } from "./types";

function getCategoryCounts(content: PortfolioContent): Record<CategoryId, number> {
  return content.categories.reduce(
    (counts, category) => ({
      ...counts,
      [category.id]: content.projects.filter((project) => project.category === category.id).length,
    }),
    {
      agentic: 0,
      tooling: 0,
      language: 0,
      vision: 0,
      systems: 0,
      products: 0,
    } satisfies Record<CategoryId, number>,
  );
}

function App() {
  const [content, setContent] = useState(portfolioContent);
  const [source, setSource] = useState<"static" | "firebase">("static");
  const [warning, setWarning] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(import.meta.env.VITE_CONTENT_SOURCE === "firebase");
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project>(portfolioContent.projects[0]);

  useEffect(() => {
    let isMounted = true;

    loadPortfolioContent().then((result) => {
      if (!isMounted) {
        return;
      }

      setContent(result.content);
      setSource(result.source);
      setWarning(result.warning);
      setSelectedProject(result.content.projects[0]);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(content), [content]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return content.projects;
    }

    return content.projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, content.projects]);

  const activeCategorySummary = useMemo(() => {
    if (activeCategory === "all") {
      return "A cross-section of public authored work, weighted toward recent AI, vision, language, and tooling repositories.";
    }

    return content.categories.find((category) => category.id === activeCategory)?.summary ?? "";
  }, [activeCategory, content.categories]);

  useEffect(() => {
    if (!filteredProjects.some((project) => project.id === selectedProject.id)) {
      setSelectedProject(filteredProjects[0] ?? content.projects[0]);
    }
  }, [content.projects, filteredProjects, selectedProject.id]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to portfolio
      </a>
      <div className="app-shell">
        <header className="topbar">
          <a className="brand-mark" href="https://github.com/ehzawad" target="_blank" rel="noreferrer">
            ehzawad
          </a>
          <p>{activeCategorySummary}</p>
        </header>

        <main id="main-content" aria-busy={isLoading}>
          <ProfilePanel profile={content.profile} source={source} warning={warning} />
          <CategoryRail
            categories={content.categories}
            activeCategory={activeCategory}
            counts={categoryCounts}
            onCategoryChange={setActiveCategory}
          />
          <FocusStrip focusAreas={content.focusAreas} />
          <SignalMap
            projects={filteredProjects}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
          <ProjectGrid projects={filteredProjects} categories={content.categories} />
        </main>
      </div>
    </>
  );
}

export default App;
