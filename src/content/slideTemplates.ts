import type { ParsedSlide, Slide, SlideTemplate } from "./parseLecture";

const templateBySlide: Record<number, SlideTemplate> = {
  1: "terminal",
  2: "incident",
  3: "split",
  4: "workflow",
  5: "workflow",
  6: "code",
  7: "git",
  8: "pr",
  9: "ci",
  10: "code",
  11: "split",
  12: "checklist",
  13: "workflow",
  14: "matrix",
  15: "matrix",
  16: "server",
  17: "server",
  18: "server",
  19: "checklist",
  20: "matrix",
  21: "secrets",
  22: "incident",
  23: "workflow",
  24: "checklist",
};

const conceptBySlide: Record<number, string> = {
  1: "ai -> git -> ci -> deploy",
  2: "local is not production",
  3: "release manager",
  4: "repeatable shipping",
  5: "small inspectable changes",
  6: "git checkpoints",
  7: "branch before AI",
  8: "self-review gate",
  9: "robot checker",
  10: "workflow file",
  11: "delivery vs deployment",
  12: "runtime checklist",
  13: "static build output",
  14: "frontend previews",
  15: "backend platform",
  16: "remote linux machine",
  17: "service boxes",
  18: "reverse proxy",
  19: "billing guardrails",
  20: "cloud when required",
  21: "commit code, configure secrets",
  22: "logs then rollback",
  23: "demo the safety process",
  24: "do not vibe deploy",
};

export function attachTemplates(slides: ParsedSlide[]): Slide[] {
  return slides.map((slide) => ({
    ...slide,
    template: templateBySlide[slide.number] ?? "terminal",
    keyConcept: conceptBySlide[slide.number] ?? slide.title.toLowerCase(),
  }));
}
