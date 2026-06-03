import { renderInlineMarkdown } from "./templates/displayParts";

export function PresenterNotes({ notes }: { notes: string }) {
  return (
    <aside className="presenter-notes" aria-label="Presenter notes">
      <div className="pane-label">speaker.txt</div>
      {notes
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{renderInlineMarkdown(paragraph.replace(/\n/g, " "))}</p>
        ))}
    </aside>
  );
}
