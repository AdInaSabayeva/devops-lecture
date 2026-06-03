import type { Slide } from "../content/parseLecture";

export function VimStatusLine({ slide }: { slide: Slide }) {
  const ciState = slide.number >= 9 ? "ci:PASS" : "ci:PENDING";
  const deployState = slide.number >= 11 ? "deploy:staging" : "deploy:none";

  return (
    <footer className="vim-statusline">
      <span className="mode">NORMAL</span>
      <span>branch:feature/live-product</span>
      <span>{ciState}</span>
      <span>{deployState}</span>
      <span className="status-concept">{slide.keyConcept}</span>
    </footer>
  );
}
