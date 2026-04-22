import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoryRail } from "./components/CategoryRail/CategoryRail";
import { FocusStrip } from "./components/FocusStrip/FocusStrip";
import { ProfilePanel } from "./components/ProfilePanel/ProfilePanel";
import { ProjectGrid } from "./components/ProjectGrid/ProjectGrid";
import { RepositoryConsole } from "./components/RepositoryConsole/RepositoryConsole";
import { portfolioContent } from "./data/portfolio";
import { createFallbackGitHubSnapshot, loadGitHubPortfolio } from "./services/githubPortfolio";
import type {
  ActiveCategory,
  CategoryId,
  GitHubLoadStatus,
  GitHubPortfolioSnapshot,
  PortfolioContent,
  Project,
} from "./types";

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
  const content = portfolioContent;
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project>(portfolioContent.projects[0]);
  const [githubSnapshot, setGithubSnapshot] = useState<GitHubPortfolioSnapshot>(() =>
    createFallbackGitHubSnapshot(portfolioContent.projects),
  );
  const [githubStatus, setGithubStatus] = useState<GitHubLoadStatus>("idle");
  const [refreshRequest, setRefreshRequest] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    setGithubStatus("loading");

    loadGitHubPortfolio(content.projects, {
      force: refreshRequest > 0,
      signal: controller.signal,
    })
      .then((snapshot) => {
        if (!isMounted) {
          return;
        }

        setGithubSnapshot(snapshot);
        setGithubStatus("ready");
      })
      .catch((error: unknown) => {
        if (!isMounted || controller.signal.aborted) {
          return;
        }

        const message = error instanceof Error ? error.message : "GitHub metadata could not be loaded.";

        setGithubSnapshot((previousSnapshot) => {
          const hasPreviousMetadata =
            Boolean(previousSnapshot.profile) ||
            Object.values(previousSnapshot.repos).some((repo) => repo.source !== "fallback");

          return hasPreviousMetadata
            ? { ...previousSnapshot, warning: message }
            : createFallbackGitHubSnapshot(content.projects, message);
        });
        setGithubStatus("error");
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [content.projects, refreshRequest]);

  const handleRefreshGitHub = useCallback(() => {
    setRefreshRequest((request) => request + 1);
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(content), [content]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return content.projects;
    }

    return content.projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, content.projects]);

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
          <span className="topbar-status">AI Engineer / Bengali language systems / agent tooling</span>
        </header>

        <main id="main-content" aria-busy={githubStatus === "loading"}>
          <ProfilePanel
            profile={content.profile}
            githubSnapshot={githubSnapshot}
            githubStatus={githubStatus}
            onRefreshGitHub={handleRefreshGitHub}
          />
          <CategoryRail
            categories={content.categories}
            activeCategory={activeCategory}
            counts={categoryCounts}
            onCategoryChange={setActiveCategory}
          />
          <FocusStrip focusAreas={content.focusAreas} />
          <RepositoryConsole
            projects={filteredProjects}
            selectedProject={selectedProject}
            githubSnapshot={githubSnapshot}
            githubStatus={githubStatus}
            onSelectProject={setSelectedProject}
          />
          <ProjectGrid
            projects={filteredProjects}
            categories={content.categories}
            githubSnapshot={githubSnapshot}
          />
        </main>
      </div>
    </>
  );
}

export default App;
