import type { AppState, BinaryFiles, ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import type { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { lazy, Suspense, useEffect, useMemo } from "react";

const STORAGE_KEY = "devops-lecture:excalidraw-scene:v1";
const Excalidraw = lazy(() =>
  import("@excalidraw/excalidraw").then((module) => ({ default: module.Excalidraw })),
);

type DrawingOverlayProps = {
  onClose: () => void;
};

type StoredScene = {
  elements?: readonly OrderedExcalidrawElement[];
  appState?: Partial<AppState>;
  files?: BinaryFiles;
};

const PERSISTED_APP_STATE_KEYS = [
  "viewBackgroundColor",
  "currentItemStrokeColor",
  "currentItemBackgroundColor",
  "currentItemFillStyle",
  "currentItemStrokeWidth",
  "currentItemStrokeStyle",
  "currentItemRoughness",
  "currentItemOpacity",
  "currentItemFontFamily",
  "currentItemFontSize",
  "currentItemTextAlign",
  "currentItemStartArrowhead",
  "currentItemEndArrowhead",
  "scrollX",
  "scrollY",
  "zoom",
] as const satisfies readonly (keyof AppState)[];

export function DrawingOverlay({ onClose }: DrawingOverlayProps) {
  const initialData = useMemo(loadStoredScene, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <section className="drawing-overlay" aria-label="Drawing board">
      <button
        type="button"
        className="drawing-backdrop"
        aria-label="Close drawing board"
        onClick={onClose}
      />
      <div className="drawing-panel" role="dialog" aria-modal="true" aria-label="Drawing board">
        <header className="drawing-header">
          <strong>scratch.excalidraw</strong>
          <button type="button" onClick={onClose} aria-label="Close drawing board" title="Close">
            x
          </button>
        </header>
        <div className="drawing-canvas">
          <Suspense fallback={<div className="drawing-loading">loading board...</div>}>
            <Excalidraw
              autoFocus
              initialData={initialData}
              name="devops-lecture-sketch"
              theme="dark"
              UIOptions={{
                canvasActions: {
                  saveToActiveFile: false,
                  loadScene: false,
                  toggleTheme: false,
                },
              }}
              onChange={(elements, appState, files) => saveScene({ elements, appState, files })}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function loadStoredScene(): ExcalidrawInitialDataState | null {
  try {
    const rawScene = window.localStorage.getItem(STORAGE_KEY);
    if (!rawScene) return null;

    const scene = JSON.parse(rawScene) as StoredScene;
    return {
      elements: scene.elements ?? [],
      appState: scene.appState,
      files: scene.files,
      scrollToContent: false,
    };
  } catch {
    return null;
  }
}

function saveScene({
  elements,
  appState,
  files,
}: {
  elements: readonly OrderedExcalidrawElement[];
  appState: AppState;
  files: BinaryFiles;
}) {
  const scene: StoredScene = {
    elements,
    appState: pickPersistedAppState(appState),
    files,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scene));
  } catch {
    // Storage can fail in private windows or when pasted images exceed quota.
  }
}

function pickPersistedAppState(appState: AppState) {
  const persistedState: Record<string, unknown> = {};

  PERSISTED_APP_STATE_KEYS.forEach((key) => {
    persistedState[key] = appState[key];
  });

  return persistedState as Partial<AppState>;
}
