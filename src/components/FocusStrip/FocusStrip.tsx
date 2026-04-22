import { Sparkles } from "lucide-react";

interface FocusStripProps {
  focusAreas: string[];
}

export function FocusStrip({ focusAreas }: FocusStripProps) {
  return (
    <section className="focus-strip" aria-labelledby="focus-title">
      <div>
        <p className="eyebrow">Current center of gravity</p>
        <h2 id="focus-title">LLM systems, local language AI, and agent tooling</h2>
      </div>
      <ul>
        {focusAreas.map((area) => (
          <li key={area}>
            <Sparkles aria-hidden="true" size={16} />
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
