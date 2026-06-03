# Design Direction

## Project

This repository contains a lecture presentation for:

```text
From Vibe Code to Live Product
```

The deck teaches school/university incubator students how to safely ship AI-generated projects using Git, CI/CD, GitHub Actions, deployment platforms, VPS basics, Docker, Nginx, secrets, logs, and rollback.

Important audience constraint:

```text
some students are non-CS
most students are AI-agent-heavy solo builders
```

The design should be technical enough to feel real, but clear enough that a non-CS student can follow the story.

## Core Aesthetic

Use a **terminal + Vim + deployment console** visual system.

The deck should feel like a guided tour through a real development environment:

```text
editor buffer
git diff
ci log
deployment dashboard
server console
rollback checklist
```

Avoid corporate startup slides, generic SaaS gradients, decorative blobs, and fake 3D dashboards.

The vibe:

```text
calm
technical
readable
slightly nostalgic
not intimidating
```

## Content Model

Each slide in `lecture/structure.md` has:

```text
## Slide N: Title

### Display
visible slide content

### Text
speaker notes / explanation
```

Build rule:

```text
Display = rendered on the slide
Text    = presenter notes, not visible by default
```

The design should render `Display` as the primary slide content. `Text` can be shown in presenter mode, exported notes, or a side panel during development.

## Deck Structure

Current deck size:

```text
24 slides
```

Visual pacing:

```text
1-5    problem + mental model
6-12   git / pr / ci / cd / deployment basics
13-20  hosting and infrastructure choices
21-24  secrets / rollback / demo / final checklist
```

Design implication:

```text
early slides = more translations and mental models
middle slides = code/workflow focused
platform slides = decision matrix style
final slides = checklist / incident response style
```

## Non-CS Readability Rule

Every technical slide should include at least one of:

- `plain version`
- `translation`
- `mental model`
- a concrete example
- a small command snippet

Do not remove technical terms. Define them near first use.

Example treatment:

```text
CI = robot checker

plain version:
  github runs commands to check your app
```

## Typography

Use one strong monospace family for the whole deck.

Preferred:

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

Recommended scale:

```css
--text-xs: 0.72rem;
--text-sm: 0.86rem;
--text-md: 1rem;
--text-lg: 1.25rem;
--text-xl: 1.7rem;
--text-2xl: 2.45rem;
--text-3xl: 3.5rem;
```

Rules:

- Use monospace because the lecture is about workflows, commands, and systems.
- Do not use tiny code text; projector readability matters more than fitting everything.
- Headings can be lowercase terminal labels: `git`, `ci`, `deploy`, `rollback`.
- Use font weight sparingly: regular for content, bold/medium for active line or status.
- Keep line length short. Prefer stacked command blocks over paragraphs.

## Color System

Use Gruvbox dark as the base palette.

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

Semantic usage:

```text
background       -> bg0-hard / bg0
panel            -> bg0-soft / bg1
border           -> bg2 / bg3
main text        -> fg1
muted text       -> fg3
commands         -> blue-bright
active cursor    -> orange-bright
success/pass     -> green-bright
warning/manual   -> yellow-bright
failure/error    -> red-bright
```

Do not introduce extra accent palettes. No purple gradient theme.

## Global Slide Frame

Each slide should feel like a buffer inside a development tool.

Recommended frame:

```text
┌ lecture/structure.md ─ slide 06/24 ─ main ───────────────┐
│                                                          │
│  slide content                                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ NORMAL  branch:feature/login  ci:pending  deploy:staging │
└──────────────────────────────────────────────────────────┘
```

Implementation can use normal CSS borders instead of literal box drawing.

Persistent UI:

- top bar: slide title, file name, slide count
- main pane: `Display` content
- bottom statusline: mode, branch, CI/deploy state, key concept
- optional command prompt row for the slide takeaway

## Slide Templates

Use a small set of reusable templates.

### Terminal Buffer

Use for:

- title
- real problem
- DevOps pipeline
- deployment checklist
- final checklist

Layout:

```text
top bar
large monospace block
bottom statusline
```

Best for slides that already contain clean `text` blocks.

### Split Pane

Use for:

- AI safety loop
- Git concepts
- CI/CD definitions
- Vercel / Railway / Render decisions
- AWS/Azure/GCP tradeoffs

Layout:

```text
left  = concept / plain version
right = workflow / code / decision
```

Keep the split obvious with a 1px border and Vim-style pane title.

### Code Editor

Use for:

- GitHub Actions YAML
- Docker Compose
- Nginx config
- Git commands

Layout:

```text
line numbers
code content
short gutter annotations
statusline
```

Code should rarely exceed 14 visible lines. If it does, emphasize only the important lines.

### Decision Matrix

Use for:

- static site generation
- Vercel
- Railway / Render
- VPS
- cloud platforms

Layout:

```text
platform      enough for              not enough for
vercel        frontend MVP            custom server ops
railway       api + db                enterprise infra
vps           control                 no-maintenance deploy
```

Use `PASS`, `WARN`, and `AVOID` labels instead of relying only on color.

### Incident Console

Use for:

- logs
- rollback
- production failure examples

Layout:

```text
error output
diagnosis command
rollback command
health check
```

Make failure states visible but not visually chaotic.

## Slide-Specific Build Notes

Use this mapping when implementing the deck:

```text
01 title                    -> Terminal Buffer, large title
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

## Visual Language

Use:

- hard rectangular geometry
- 1px borders
- 0-4px border radius
- selected-line highlight
- terminal cursor
- Vim mode labels: `NORMAL`, `INSERT`, `VISUAL`, `COMMAND`
- branch labels: `main`, `feature/login`, `deploy/staging`
- status badges rendered as text: `PASS`, `FAIL`, `WARN`
- subtle grain or scanline texture only if readability stays high

Avoid:

- glassmorphism
- glossy cards
- rounded marketing UI
- stock illustrations
- emoji-heavy slides
- huge centered paragraphs
- excessive animations
- decorative Kubernetes/cloud logos as the main visual

## Diagram Style

Prefer ASCII/system diagrams over decorative illustrations.

Good:

```text
browser
  -> nginx :443
  -> app :3000
  -> db :5432
```

Good:

```text
AI edit -> git diff -> CI PASS -> deploy preview -> merge
```

Avoid abstract arrows with vague labels like:

```text
innovation -> acceleration -> transformation
```

## Code Snippet Treatment

Code snippets should feel real and useful.

Rules:

- Show line numbers for YAML, Docker Compose, and Nginx.
- Use syntax highlighting from the Gruvbox palette.
- Highlight 1-3 important lines per slide.
- Avoid screenshots of code; render code as text.
- Add short annotations outside the code block, not long comments inside it.

Example annotation style:

```text
03 on: pull_request       # when workflow runs
10 run: npm test          # robot checker
```

## Motion

Motion should feel like a terminal, not a web landing page.

Allowed:

- cursor blink
- command typed in once
- line-by-line output reveal
- active pane focus change
- status changing from `PENDING` to `PASS`
- failed command briefly flashing red
- slide transition like switching Vim buffers

Avoid:

- bouncing cards
- parallax
- spinning logos
- heavy staggered hero animations
- motion that delays reading

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

## React Component Direction

Recommended components:

```text
Deck
Slide
PresenterNotes
TerminalFrame
VimTopBar
VimStatusLine
TerminalPane
CodeBlock
CommandLine
DiffView
WorkflowSteps
DecisionMatrix
Checklist
IncidentConsole
ServerMap
```

Content/presentation separation:

- `lecture/structure.md` is the content source.
- `Display` becomes visible slide content.
- `Text` becomes presenter notes.
- Components should be reusable and driven by slide metadata where possible.
- Avoid one-off slide code unless the layout is genuinely unique.

## Accessibility

Requirements:

- Strong contrast on projector screens.
- Code font should remain readable from the back of a room.
- Do not rely on color alone; pair with text labels like `PASS`, `FAIL`, `WARN`.
- Keep technical terms paired with plain-language translation.
- Use semantic HTML where possible.
- Support keyboard navigation.
- Avoid fast blinking or distracting animations.
- Presenter notes should be available for students who need explanation after the lecture.

## Implementation Defaults

Suggested CSS base:

```css
html,
body,
#root {
  min-height: 100%;
  margin: 0;
  background: var(--bg0-hard);
  color: var(--fg1);
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
}

* {
  box-sizing: border-box;
}
```

Recommended slide sizing:

```css
.slide {
  width: 100vw;
  height: 100vh;
  padding: clamp(24px, 4vw, 64px);
}

.terminal-frame {
  width: 100%;
  height: 100%;
  border: 1px solid var(--bg3);
  background: var(--bg0);
}
```

## Success Criteria

The deck succeeds if:

- non-CS students understand the first-pass meaning of every major term
- technical students still see real commands, workflows, and deployment concepts
- every slide can be scanned quickly
- code snippets look like real development artifacts
- the deck feels like a guided terminal session, not a generic DevOps pitch
- the final mental model is clear:

```text
AI writes code.
Git tracks code.
PR inspects code.
CI checks code.
Deployment puts it online.
Logs explain what happened.
Rollback saves the release.
```

