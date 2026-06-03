import type { Slide as SlideData } from "../content/parseLecture";
import { Checklist } from "./templates/Checklist";
import { CodeBlock } from "./templates/CodeBlock";
import { DecisionMatrix } from "./templates/DecisionMatrix";
import { IncidentConsole } from "./templates/IncidentConsole";
import { ServerMap } from "./templates/ServerMap";
import { SplitPane } from "./templates/SplitPane";
import { TerminalBuffer } from "./templates/TerminalBuffer";
import { WorkflowSteps } from "./templates/WorkflowSteps";
import { parseDisplay } from "./templates/displayParts";
import { PresenterNotes } from "./PresenterNotes";
import { VimStatusLine } from "./VimStatusLine";
import { VimTopBar } from "./VimTopBar";

type SlideProps = {
  slide: SlideData;
  totalSlides: number;
  progress: string;
  showNotes: boolean;
};

export function Slide({ slide, totalSlides, progress, showNotes }: SlideProps) {
  const parts = parseDisplay(slide.display);

  return (
    <section className="slide-viewport" aria-labelledby="slide-title">
      <div className={`terminal-frame template-${slide.template}`}>
        <VimTopBar slide={slide} totalSlides={totalSlides} progress={progress} />
        <div className="slide-body">
          <div className="slide-content">
            <Template slide={slide} parts={parts} />
          </div>
          {showNotes ? <PresenterNotes notes={slide.text} /> : null}
        </div>
        <VimStatusLine slide={slide} />
      </div>
    </section>
  );
}

type TemplateProps = {
  slide: SlideData;
  parts: ReturnType<typeof parseDisplay>;
};

function Template({ slide, parts }: TemplateProps) {
  if (slide.template === "workflow") return <WorkflowSteps slide={slide} parts={parts} />;
  if (slide.template === "incident" || slide.template === "ci") {
    return <IncidentConsole slide={slide} parts={parts} />;
  }
  if (slide.template === "split" || slide.template === "git" || slide.template === "pr") {
    return <SplitPane slide={slide} parts={parts} />;
  }
  if (slide.template === "code") return <CodeBlock slide={slide} parts={parts} />;
  if (slide.template === "checklist" || slide.template === "secrets") {
    return <Checklist slide={slide} parts={parts} />;
  }
  if (slide.template === "matrix") return <DecisionMatrix slide={slide} parts={parts} />;
  if (slide.template === "server") return <ServerMap slide={slide} parts={parts} />;
  return <TerminalBuffer slide={slide} parts={parts} />;
}
