import { portfolioContent } from "../data/portfolio";
import { loadFirebasePortfolio } from "./firebasePortfolio";
import type { PortfolioContent } from "../types";

interface PortfolioLoadResult {
  content: PortfolioContent;
  source: "static" | "firebase";
  warning?: string;
}

export async function loadPortfolioContent(): Promise<PortfolioLoadResult> {
  if (import.meta.env.VITE_CONTENT_SOURCE !== "firebase") {
    return { content: portfolioContent, source: "static" };
  }

  try {
    const firebaseContent = await loadFirebasePortfolio();

    if (firebaseContent) {
      return { content: firebaseContent, source: "firebase" };
    }

    return {
      content: portfolioContent,
      source: "static",
      warning: "Firebase was selected but no live portfolio document was found.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Firebase load error.";

    return {
      content: portfolioContent,
      source: "static",
      warning: message,
    };
  }
}
