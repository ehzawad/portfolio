import {
  AudioLines,
  Bot,
  Boxes,
  BrainCircuit,
  Cpu,
  ScanEye,
  Wrench,
} from "lucide-react";
import type { ActiveCategory, Category, CategoryId } from "../../types";

interface CategoryRailProps {
  categories: Category[];
  activeCategory: ActiveCategory;
  counts: Record<CategoryId, number>;
  onCategoryChange: (category: ActiveCategory) => void;
}

const iconMap = {
  all: Boxes,
  agentic: Bot,
  tooling: Wrench,
  language: AudioLines,
  vision: ScanEye,
  systems: Cpu,
  products: BrainCircuit,
};

export function CategoryRail({
  categories,
  activeCategory,
  counts,
  onCategoryChange,
}: CategoryRailProps) {
  const AllIcon = iconMap.all;

  return (
    <nav className="category-rail" aria-label="Portfolio focus filters">
      <button
        type="button"
        className={activeCategory === "all" ? "rail-button is-active" : "rail-button"}
        aria-pressed={activeCategory === "all"}
        onClick={() => onCategoryChange("all")}
      >
        <AllIcon aria-hidden="true" size={18} />
        <span>All</span>
        <span className="rail-count">{Object.values(counts).reduce((total, count) => total + count, 0)}</span>
      </button>

      {categories.map((category) => {
        const Icon = iconMap[category.id];
        const isActive = activeCategory === category.id;

        return (
          <button
            type="button"
            key={category.id}
            className={isActive ? "rail-button is-active" : "rail-button"}
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category.id)}
          >
            <Icon aria-hidden="true" size={18} />
            <span>{category.shortLabel}</span>
            <span className="rail-count">{counts[category.id]}</span>
          </button>
        );
      })}
    </nav>
  );
}
