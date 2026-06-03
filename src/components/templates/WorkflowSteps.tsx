import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function WorkflowSteps({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  const arrows = parts.lines
    .map((line) => line.trim())
    .filter((line) => line.includes("->"))
    .join(" ")
    .split("->")
    .map((step) => step.trim())
    .filter(Boolean);

  const sections = parts.sections.filter((section) => section.label !== "buffer");

  return (
    <article className="workflow-view">
      <div className="pane-label">pipeline.run</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <div className="workflow-track">
        {(arrows.length ? arrows : parts.lines.filter(Boolean).slice(1, 7)).map((step, index) => (
          <div className="workflow-step" key={`${step}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.replace(/^->\s*/, "")}</strong>
          </div>
        ))}
      </div>
      <div className="section-grid">
        {sections.map((section) => (
          <section key={section.label}>
            <h3>{section.label}</h3>
            {section.items.map((item) => (
              <p key={item} className={statusClass(item)}>
                {item}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
