import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function WorkflowSteps({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  const arrows = workflowSteps(parts.lines);

  const sections = parts.sections.filter((section) => section.label !== "buffer");

  return (
    <article className="workflow-view">
      <div className="pane-label">pipeline.run</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <ol className="workflow-track" aria-label="workflow steps">
        {(arrows.length ? arrows : parts.lines.filter(Boolean).slice(1, 7)).map((step, index) => (
          <li className="workflow-step" key={`${step}-${index}`}>
            <span className="workflow-step-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.replace(/^->\s*/, "")}</strong>
          </li>
        ))}
      </ol>
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

function workflowSteps(lines: string[]) {
  const normalized = lines.map((line) => line.trim());
  const firstArrow = normalized.findIndex((line) => line.startsWith("->"));

  if (firstArrow === -1) {
    return [];
  }

  const previous = [...normalized.slice(0, firstArrow)]
    .reverse()
    .find((line) => line && !line.endsWith(":"));
  const chain = normalized
    .slice(firstArrow)
    .filter((line) => line.startsWith("->"))
    .join(" ");

  return [previous, ...chain.split("->")]
    .map((step) => step?.trim())
    .filter((step): step is string => Boolean(step));
}
