import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function Checklist({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="checklist-view">
      <div className="pane-label">release.checklist</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <div className="checklist-grid">
        {parts.sections.map((section) => (
          <section key={section.label}>
            <h3>{section.label}</h3>
            {section.items.map((item) => (
              <div className={`check-row ${statusClass(`${section.label} ${item}`)}`} key={item}>
                <span>[ ]</span>
                <p>{item}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
