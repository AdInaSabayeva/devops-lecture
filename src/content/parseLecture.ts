export type SlideTemplate =
  | "terminal"
  | "incident"
  | "split"
  | "workflow"
  | "code"
  | "git"
  | "pr"
  | "ci"
  | "checklist"
  | "matrix"
  | "server"
  | "secrets";

export type ParsedSlide = {
  number: number;
  title: string;
  display: string;
  text: string;
  sourcePath?: string;
};

export type Slide = ParsedSlide & {
  template: SlideTemplate;
  keyConcept: string;
};

const slideHeading = /^## Slide (\d+):\s*(.+)$/gm;

export function parseLecture(markdown: string): ParsedSlide[] {
  const matches = [...markdown.matchAll(slideHeading)];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const block = markdown.slice(start, end);

    const display = sectionBody(block, "Display");
    const text = sectionBody(block, "Text");

    return {
      number: Number(match[1]),
      title: match[2].trim(),
      display,
      text,
    };
  });
}

export function parseSlide(markdown: string, sourcePath?: string): ParsedSlide {
  const match = [...markdown.matchAll(slideHeading)][0];
  if (!match) {
    throw new Error(`Missing slide heading in ${sourcePath ?? "markdown source"}`);
  }

  return {
    number: Number(match[1]),
    title: match[2].trim(),
    display: sectionBody(markdown, "Display"),
    text: sectionBody(markdown, "Text"),
    sourcePath,
  };
}

function sectionBody(block: string, section: "Display" | "Text") {
  const marker = `### ${section}`;
  const start = block.indexOf(marker);
  if (start === -1) return "";

  const afterMarker = start + marker.length;
  const nextSection = block.indexOf("\n### ", afterMarker);
  const raw =
    nextSection === -1
      ? block.slice(afterMarker)
      : block.slice(afterMarker, nextSection);

  return stripOuterRule(raw.trim());
}

function stripOuterRule(value: string) {
  return value.replace(/\n---\s*$/m, "").trim();
}
