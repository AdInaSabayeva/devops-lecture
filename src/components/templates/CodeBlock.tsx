import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";

export function CodeBlock({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="code-editor" aria-label={`${slide.title} code`}>
      <div className="pane-label">{fileNameFor(slide, parts.language)}</div>
      <ol>
        {parts.lines.map((line, index) => (
          <li key={`${line}-${index}`} className={highlightLine(line) ? "highlight" : ""}>
            <code>{line || " "}</code>
          </li>
        ))}
      </ol>
    </article>
  );
}

function fileNameFor(slide: Slide, language: string) {
  if (language === "yaml") return ".github/workflows/ci.yml";
  if (/nginx/i.test(slide.title)) return "/etc/nginx/sites-enabled/app.conf";
  return `slide-${String(slide.number).padStart(2, "0")}.txt`;
}

function highlightLine(line: string) {
  return /(git|npm|run|uses:|branches:|deploy|rollback|DATABASE_URL|proxy_pass)/.test(line);
}
