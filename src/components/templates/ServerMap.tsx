import type { Slide } from "../../content/parseLecture";
import type { DisplayParts } from "./displayParts";

export function ServerMap({ slide, parts }: { slide: Slide; parts: DisplayParts }) {
  return (
    <article className="server-map">
      <div className="pane-label">vps.session</div>
      <h2>{slide.title.toLowerCase()}</h2>
      <div className="server-grid">
        <div className="server-node public">
          <span>public</span>
          <strong>browser</strong>
          <p>:443</p>
        </div>
        <div className="server-node proxy">
          <span>proxy</span>
          <strong>{/nginx/i.test(slide.title) ? "nginx" : "vps"}</strong>
          <p>ssh + docker</p>
        </div>
        <div className="server-node app">
          <span>services</span>
          <strong>app / api / db</strong>
          <p>private ports</p>
        </div>
      </div>
      <pre>{parts.code}</pre>
    </article>
  );
}
