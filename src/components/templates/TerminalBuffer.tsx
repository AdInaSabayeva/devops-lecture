import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";

export function TerminalBuffer({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="terminal-buffer">
      {slide.number === 1 ? (
        <h1>
          <span>FROM VIBE CODE</span>
          <span>TO LIVE PRODUCT</span>
        </h1>
      ) : (
        <h2>{slide.title.toLowerCase()}</h2>
      )}
      <pre>{parts.code}</pre>
      <div className="command-line">
        <span>:</span>
        <span>{slide.keyConcept}</span>
        <i />
      </div>
    </article>
  );
}
