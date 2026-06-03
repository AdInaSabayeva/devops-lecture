import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function SplitPane({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  const midpoint = Math.ceil(parts.sections.length / 2);
  const left = parts.sections.slice(0, midpoint);
  const right = parts.sections.slice(midpoint);

  return (
    <article className="split-view">
      <section>
        <div className="pane-label">concept</div>
        <h2>{slide.title.toLowerCase()}</h2>
        <SectionList sections={left} />
      </section>
      <section>
        <div className="pane-label">workflow</div>
        <SectionList sections={right.length ? right : left} />
      </section>
    </article>
  );
}

function SectionList({ sections }: { sections: DisplayParts["sections"] }) {
  return (
    <>
      {sections.map((section) => (
        <div className="mini-section" key={section.label}>
          <h3>{section.label}</h3>
          {section.items.map((item) => (
            <p key={item} className={statusClass(item)}>
              {item}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
