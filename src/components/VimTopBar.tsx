import type { Slide } from "../content/parseLecture";

type VimTopBarProps = {
  slide: Slide;
  totalSlides: number;
  progress: string;
};

export function VimTopBar({ slide, totalSlides, progress }: VimTopBarProps) {
  return (
    <header className="vim-topbar">
      <span>{slide.sourcePath ?? "lecture/slides"}</span>
      <strong id="slide-title">{slide.title}</strong>
      <span>
        slide {progress} total:{totalSlides}
      </span>
    </header>
  );
}
