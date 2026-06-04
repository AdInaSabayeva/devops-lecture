import { useEffect, useMemo, useState } from "react";
import type { Slide as SlideData } from "../content/parseLecture";
import { DrawingOverlay } from "./DrawingOverlay";
import { Slide } from "./Slide";

type DeckProps = {
  slides: SlideData[];
};

export function Deck({ slides }: DeckProps) {
  const [index, setIndex] = useState(() => readInitialIndex(slides.length));
  const [showNotes, setShowNotes] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const activeSlide = slides[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isDrawingOpen) return;

      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        setIndex((current) => Math.min(current + 1, slides.length - 1));
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(slides.length - 1);
      if (event.key.toLowerCase() === "n") setShowNotes((value) => !value);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawingOpen, slides.length]);

  useEffect(() => {
    const nextHash = `#${activeSlide.number}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [activeSlide.number]);

  const progress = useMemo(
    () => `${String(activeSlide.number).padStart(2, "0")}/${String(slides.length).padStart(2, "0")}`,
    [activeSlide.number, slides.length],
  );

  return (
    <main className="deck-shell" aria-label="Lecture presentation">
      <Slide
        slide={activeSlide}
        totalSlides={slides.length}
        progress={progress}
        showNotes={showNotes}
      />

      <nav className="deck-controls" aria-label="Slide controls">
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(current - 1, 0))}
          disabled={index === 0}
          aria-label="Previous slide"
          title="Previous slide"
        >
          &lt;
        </button>
        <span>{progress}</span>
        <button
          type="button"
          onClick={() => setIndex((current) => Math.min(current + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          title="Next slide"
        >
          &gt;
        </button>
        <button
          type="button"
          className={showNotes ? "active" : ""}
          onClick={() => setShowNotes((value) => !value)}
          aria-pressed={showNotes}
          title="Toggle speaker notes"
        >
          notes
        </button>
        <button
          type="button"
          className={isDrawingOpen ? "active" : ""}
          onClick={() => setIsDrawingOpen((value) => !value)}
          aria-pressed={isDrawingOpen}
          title="Toggle drawing board"
        >
          draw
        </button>
      </nav>

      {isDrawingOpen && <DrawingOverlay onClose={() => setIsDrawingOpen(false)} />}
    </main>
  );
}

function readInitialIndex(totalSlides: number) {
  const value = Number(window.location.hash.replace("#", ""));
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value - 1, 0), totalSlides - 1);
}
