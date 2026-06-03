import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";

export function CodeBlock({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article
      className={`code-editor language-${parts.language}`}
      aria-label={`${slide.title} code`}
    >
      <div className="code-window-bar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-tab">{fileNameFor(slide, parts.language)}</span>
        <span className="code-language">{parts.language}</span>
      </div>
      <ol>
        {parts.lines.map((line, index) => (
          <li
            key={`${line}-${index}`}
            className={lineClasses(line, parts.language)}
            aria-label={`line ${index + 1}`}
          >
            <code>{renderCodeLine(line, parts.language)}</code>
          </li>
        ))}
      </ol>
    </article>
  );
}

function fileNameFor(slide: Slide, language: string) {
  if (language === "yaml") return ".github/workflows/ci.yml";
  if (language === "bash") return "terminal.sh";
  if (/nginx/i.test(slide.title)) return "/etc/nginx/sites-enabled/app.conf";
  return `slide-${String(slide.number).padStart(2, "0")}.txt`;
}

function lineClasses(line: string, language: string) {
  const classes = ["code-line"];
  const trimmed = line.trim();

  if (!trimmed) classes.push("is-empty");
  if (isHighlighted(line)) classes.push("highlight");
  if (/^\s*\$/.test(line) || language === "bash") classes.push("is-command");
  if (/^\s*[-\w]+\s*:/.test(line)) classes.push("has-key");

  return classes.join(" ");
}

function isHighlighted(line: string) {
  return /(git|npm|run|uses:|branches:|deploy|rollback|DATABASE_URL|proxy_pass)/.test(line);
}

function renderCodeLine(line: string, language: string) {
  if (!line) return <span aria-hidden="true">&nbsp;</span>;

  if (/^\s*\$/.test(line)) {
    const [, indent = "", command = ""] = line.match(/^(\s*)\$\s?(.*)$/) ?? [];
    return (
      <>
        {indent}
        <span className="syntax-prompt">$</span>
        <span className="syntax-command"> {command}</span>
      </>
    );
  }

  if (/^\s*#/.test(line)) {
    return <span className="syntax-comment">{line}</span>;
  }

  const yaml = line.match(/^(\s*)(-\s*)?([\w-]+)(:)(.*)$/);
  if (language === "yaml" && yaml) {
    return (
      <>
        {yaml[1]}
        {yaml[2] ? <span className="syntax-operator">{yaml[2]}</span> : null}
        <span className="syntax-key">{yaml[3]}</span>
        <span className="syntax-operator">{yaml[4]}</span>
        {renderValue(yaml[5])}
      </>
    );
  }

  const nginx = line.match(/^(\s*)(server|location|listen|server_name|proxy_pass)(\b)(.*)$/);
  if (language === "nginx" && nginx) {
    return (
      <>
        {nginx[1]}
        <span className="syntax-key">{nginx[2]}</span>
        {nginx[3]}
        {renderValue(nginx[4])}
      </>
    );
  }

  return renderValue(line);
}

function renderValue(value: string) {
  const chunks = value.split(/(".*?"|\[.*?\]|->|:?\d+|https?:\/\/\S+)/g);

  return chunks.map((chunk, index) => {
    if (!chunk) return null;
    if (/^".*"$/.test(chunk)) {
      return (
        <span className="syntax-string" key={index}>
          {chunk}
        </span>
      );
    }
    if (/^\[.*\]$/.test(chunk)) {
      return (
        <span className="syntax-value" key={index}>
          {chunk}
        </span>
      );
    }
    if (chunk === "->") {
      return (
        <span className="syntax-operator" key={index}>
          {chunk}
        </span>
      );
    }
    if (/^:?\d+$/.test(chunk) || /^https?:\/\//.test(chunk)) {
      return (
        <span className="syntax-value" key={index}>
          {chunk}
        </span>
      );
    }
    return chunk;
  });
}
