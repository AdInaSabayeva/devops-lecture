import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function DecisionMatrix({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="matrix-view">
      <div className="pane-label">platform.matrix</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <div className="matrix-table">
        <div className="matrix-head">topic</div>
        <div className="matrix-head">signal</div>
        <div className="matrix-head">decision</div>
        {parts.sections.map((section) =>
          section.items.map((item, index) => (
            <Row
              key={`${section.label}-${item}`}
              topic={index === 0 ? section.label : ""}
              item={item}
              state={statusClass(`${section.label} ${item}`)}
            />
          )),
        )}
      </div>
    </article>
  );
}

function Row({ topic, item, state }: { topic: string; item: string; state: string }) {
  const label = state === "pass" ? "PASS" : state === "warn" ? "WARN" : "INFO";
  return (
    <>
      <div>{topic}</div>
      <div>{item}</div>
      <div>
        <span className={`badge ${state}`}>{label}</span>
      </div>
    </>
  );
}
