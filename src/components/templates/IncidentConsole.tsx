import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";
import { statusClass } from "./displayParts";

export function IncidentConsole({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="incident-console">
      <div className="pane-label">prod.log</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <div className="log-lines">
        {parts.lines
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, index) => (
            <p className={statusClass(line)} key={`${line}-${index}`}>
              <span>{timestamp(index)}</span>
              <code>{line}</code>
            </p>
          ))}
      </div>
    </article>
  );
}

function timestamp(index: number) {
  return `22:${String(10 + index).padStart(2, "0")}:${String((index * 7) % 60).padStart(2, "0")}`;
}
