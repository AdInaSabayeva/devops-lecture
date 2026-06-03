import type { ReactNode } from "react";

export type DisplayParts = {
  language: string;
  code: string;
  lines: string[];
  titleLines: string[];
  sections: Section[];
};

export type Section = {
  label: string;
  items: string[];
};

export function parseDisplay(markdown: string): DisplayParts {
  const fence = markdown.match(/```(\w+)?\n([\s\S]*?)```/);
  const code = (fence?.[2] ?? markdown).trim();
  const language = fence?.[1] ?? "text";
  const lines = code.split("\n");

  return {
    language,
    code,
    lines,
    titleLines: lines.filter((line) => line.trim() && !line.startsWith(" ")).slice(0, 2),
    sections: parseSections(lines),
  };
}

export function parseSections(lines: string[]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.endsWith(":")) {
      current = { label: trimmed.replace(/:$/, ""), items: [] };
      sections.push(current);
      return;
    }

    if (!current) {
      current = { label: "buffer", items: [] };
      sections.push(current);
    }

    current.items.push(trimmed);
  });

  return sections;
}

export function renderInlineMarkdown(value: string): ReactNode {
  const chunks = value.split(/(`[^`]+`)/g);
  return chunks.map((chunk, index) => {
    if (chunk.startsWith("`") && chunk.endsWith("`")) {
      return <code key={index}>{chunk.slice(1, -1)}</code>;
    }
    return chunk;
  });
}

export function statusClass(value: string) {
  const normalized = value.toLowerCase();
  if (/(fail|bad|broke|500|warning|warn|missing|not ideal|cons|rollback)/.test(normalized)) {
    return "warn";
  }
  if (/(good|pass|green|stable|safe|best|pros|works|configured)/.test(normalized)) {
    return "pass";
  }
  return "info";
}
