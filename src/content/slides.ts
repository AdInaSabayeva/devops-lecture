import { parseSlide } from "./parseLecture";
import { attachTemplates } from "./slideTemplates";

const slideModules = import.meta.glob("../../lecture/slides/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const slides = attachTemplates(
  Object.entries(slideModules)
    .map(([sourcePath, markdown]) =>
      parseSlide(markdown, sourcePath.replace("../../", "")),
    )
    .sort((left, right) => left.number - right.number),
);
