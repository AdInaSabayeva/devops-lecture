# Technical Direction

## Project Target

Build the lecture deck as a web-based presentation for:

```text
From Vibe Code to Live Product
```

The implementation should use:

```text
Vite + Rolldown
React
Markdown content source
CSS modules or plain scoped CSS
```

Vite is the development and build tool. Rolldown is the intended bundler path for fast local iteration and production builds.

The deck should feel like a guided terminal/editor session, matching the direction in `design.md`, while keeping the content structure from `lecture/slides/*.md`.

Deployment direction:

```text
target: VPS
runtime demo: Docker Compose + Nginx
not target: Vercel / Netlify / Cloudflare Pages / GitHub Pages
```

The project should stay simple enough to build as static files, but the lecture implementation should be prepared for a live VPS deployment demo. Do not add deployment code yet; document the target and keep the future deployment path clear.

## Content Model

`lecture/slides/*.md` is the source of truth for slide content.

Each slide lives in its own file named with stable ordering plus a snake-case title:

```text
lecture/slides/01_title.md
lecture/slides/02_the_real_problem.md
lecture/slides/03_your_new_role.md
```

Each slide follows this shape:

```text
## Slide N: Title

### Display
visible slide content

### Text
speaker notes / explanation
```

Implementation rules:

- `Display` renders as the main visible slide content.
- `Text` renders as presenter notes, export notes, or a development side panel.
- Slide title and number should be parsed from `## Slide N: Title`.
- Slide count should be derived from parsed content, not hardcoded.
- Slide template should be selected through metadata or a small mapping layer.
- Raw Markdown should not leak into the rendered deck unless intentionally shown as code.

Recommended parsing flow:

```text
lecture/slides/*.md
  -> import raw slide files
  -> parse each slide
  -> normalize display/text/title/number
  -> attach template metadata
  -> render React deck
```

## Frontend Architecture

Recommended app structure:

```text
src/
  main.tsx
  App.tsx
  content/
    slides.ts
    parseLecture.ts
    slideTemplates.ts
  components/
    Deck.tsx
    Slide.tsx
    PresenterNotes.tsx
    TerminalFrame.tsx
    VimTopBar.tsx
    VimStatusLine.tsx
    TerminalPane.tsx
    CodeBlock.tsx
    CommandLine.tsx
    WorkflowSteps.tsx
    DecisionMatrix.tsx
    Checklist.tsx
    IncidentConsole.tsx
    ServerMap.tsx
  styles/
    tokens.css
    global.css
    deck.css
```

Component responsibilities:

- `Deck`: owns slide order, keyboard navigation, presenter mode, and route/hash state.
- `Slide`: renders one parsed slide with a selected template.
- `PresenterNotes`: renders `Text` content outside the default audience view.
- `TerminalFrame`: provides the global editor-like frame.
- `VimTopBar`: shows file name, slide title, and slide count.
- `VimStatusLine`: shows mode, branch, CI/deploy state, and key concept.
- `CodeBlock`: renders code with line numbers and Gruvbox syntax colors.
- `WorkflowSteps`: renders linear process flows like AI edit -> git diff -> CI.
- `DecisionMatrix`: renders platform choice slides.
- `Checklist`: renders merge, deploy, rollback, and final checklists.
- `IncidentConsole`: renders failure, logs, diagnosis, and rollback slides.
- `ServerMap`: renders infrastructure diagrams such as browser -> nginx -> app.

Avoid one-off slide components unless a slide cannot reasonably fit a reusable template.

## Slide Template Mapping

Use the template mapping from `design.md` as the default implementation map:

```text
01 title                    -> Terminal Buffer
02 real problem             -> Incident Console
03 your new role            -> Split Pane
04 devops pipeline          -> Workflow Diagram
05 ai safety loop           -> Workflow Diagram
06 git time machine         -> Code Editor + glossary
07 branches                 -> Git graph / command block
08 pull request             -> PR inspection screen
09 ci                       -> CI log view
10 github actions           -> Code Editor
11 cd and deployment        -> Split Pane
12 deployment checklist     -> Checklist
13 static site generation   -> Pipeline + platform list
14 vercel                   -> Decision Matrix
15 railway/render           -> Decision Matrix
16 vps                      -> Server Console
17 docker/compose           -> Code Editor + service map
18 nginx                    -> Reverse proxy diagram + config
19 cloud credits            -> Warning checklist
20 aws/azure/gcp            -> Tradeoff matrix
21 secrets                  -> Redacted env file
22 rollback/logs            -> Incident Console
23 live demo flow           -> Workflow Diagram
24 final checklist          -> Checklist
```

The mapping can live in `slideTemplates.ts` so content and presentation stay separate.

## Vite And Rolldown Setup

Use Vite as the app runtime and build system.

Recommended scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Use the Vite React plugin appropriate for the Rolldown-enabled setup available at implementation time.

Technical expectations:

- TypeScript should be enabled for app code.
- Markdown should be imported as raw text for parsing.
- Build output should be static files that can be copied into a container image and served through Nginx on a VPS.
- The deck should not require a backend server.

Recommended Markdown import pattern:

```ts
const slideModules = import.meta.glob("../../lecture/slides/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
```

## Styling System

Use one monospace stack for the entire deck:

```css
font-family:
  "JetBrains Mono",
  "JetBrainsMono Nerd Font",
  "IBM Plex Mono",
  "Fira Code",
  ui-monospace,
  SFMono-Regular,
  Menlo,
  Consolas,
  monospace;
```

Use Gruvbox dark tokens from `design.md`:

```css
:root {
  --bg0-hard: #1d2021;
  --bg0: #282828;
  --bg0-soft: #32302f;
  --bg1: #3c3836;
  --bg2: #504945;
  --bg3: #665c54;

  --fg0: #fbf1c7;
  --fg1: #ebdbb2;
  --fg2: #d5c4a1;
  --fg3: #bdae93;
  --fg4: #a89984;

  --red: #cc241d;
  --red-bright: #fb4934;
  --green: #98971a;
  --green-bright: #b8bb26;
  --yellow: #d79921;
  --yellow-bright: #fabd2f;
  --blue: #458588;
  --blue-bright: #83a598;
  --aqua: #689d6a;
  --aqua-bright: #8ec07c;
  --orange: #d65d0e;
  --orange-bright: #fe8019;
}
```

Visual rules:

- Use dark terminal/editor panels.
- Use 1px borders.
- Use 0-4px border radius.
- Use selected-line highlights and Vim-style status labels.
- Use text labels such as `PASS`, `FAIL`, and `WARN` instead of relying only on color.
- Do not use decorative gradients, blobs, glassmorphism, glossy cards, or fake SaaS dashboards.
- Render code as text, not screenshots.

## Interaction

Required behavior:

- Left/right arrow navigation.
- Space/shift-space navigation.
- Direct slide linking through hash or route state.
- Presenter notes toggle.
- Fullscreen-friendly layout.
- Responsive scaling for common projector and laptop resolutions.

Optional behavior:

- Vim-like slide commands such as `j`, `k`, `h`, `l`.
- Slide overview mode.
- Export-friendly notes view.
- Small terminal-style motion: cursor blink, line reveal, or status change.

Motion must respect reduced-motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

## Accessibility And Readability

The deck is for a mixed audience, including non-CS students.

Requirements:

- Keep projector readability higher priority than fitting maximum text.
- Preserve plain-language explanations from the lecture content.
- Keep technical terms near translations, mental models, or concrete examples.
- Use semantic HTML for headings, lists, code blocks, and navigation controls.
- Ensure keyboard navigation works without a mouse.
- Do not rely on color alone.
- Avoid fast blinking or motion that delays reading.
- Presenter notes should be available for students who need extra explanation after the lecture.

## Build And Deployment Expectations

The deck should build to static assets:

```text
npm run build
  -> dist/
```

Deployment target:

```text
VPS
Docker Compose
Nginx
```

The implementation should keep the app itself simple:

- No server runtime required.
- No database.
- No secrets.
- No external API dependency for rendering the deck.

The deployment story should demonstrate real infrastructure concepts:

- Build the Vite deck into static files.
- Serve the built files from a container.
- Use Docker Compose to run the service.
- Use Nginx as the public reverse proxy.
- Show how domain routing, ports, logs, and restart behavior work on a VPS.

Do not add Docker, Compose, Nginx, CI, or server provisioning files yet. Those should be introduced later as part of the live deployment demo so students can see the infrastructure being built step by step.

## Verification Checklist

Before considering the deck implementation complete:

- All 24 slides from `lecture/slides/*.md` render in order.
- `Display` content is visible in the audience slide view.
- `Text` content is available as presenter notes.
- Slide count and slide numbers are correct.
- Keyboard navigation works.
- The Vite production build completes.
- A local production preview serves the built deck.
- Code slides show readable line numbers.
- Decision slides show text labels such as `PASS`, `WARN`, or equivalent wording.
- Reduced-motion mode disables nonessential animation.
- The visual result matches the terminal + Vim + deployment console direction from `design.md`.
- The technical direction clearly targets a VPS live demo, not a managed static deployment platform.
