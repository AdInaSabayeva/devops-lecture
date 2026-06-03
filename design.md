# Design Direction

## Project

This repository contains a React-based lecture presentation for:

```text
From Vibe Code to Live Product
```

The deck teaches beginner and non-coder incubator students how DevOps, Git workflow, CI/CD, GitHub Actions, deployment, logs, and rollback help them safely ship AI-generated projects.

The visual direction should feel like a focused terminal session inside Vim: technical, calm, legible, and a little nostalgic. It should not feel like a corporate slide deck, SaaS landing page, or generic gradient-heavy AI presentation.

## Core Aesthetic

Use a terminal + Vim style built around:

- Gruvbox dark palette
- JetBrains Mono typography
- Vim statusline and command-line details
- terminal panes, prompts, diffs, logs, CI output, and YAML snippets
- restrained motion that feels like typing, cursor movement, terminal output, and pane changes

The deck should look like someone is teaching from a real development environment, not decorating slides with fake code.

## Audience Fit

The audience is mostly students, beginner coders, and AI-agent-heavy builders. The design must be visually technical without becoming intimidating.

Priorities:

- Make every concept scannable from the back of a room.
- Keep code snippets short and high contrast.
- Use terminal metaphors to explain process, not to show off complexity.
- Favor concrete workflow diagrams over abstract DevOps graphics.
- Treat the presenter as a guide through a controlled release process.

## Typography

Primary font:

```css
font-family: "JetBrains Mono", "JetBrainsMono Nerd Font", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

Use JetBrains Mono for all text, including headings. The monospaced typography is part of the concept.

Recommended scale:

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-md: 1rem;
--text-lg: 1.25rem;
--text-xl: 1.75rem;
--text-2xl: 2.5rem;
--text-3xl: 3.75rem;
```

Guidelines:

- Use normal letter spacing.
- Do not use negative letter spacing.
- Use font weight changes sparingly: regular, medium, bold.
- Headings can use lowercase terminal phrasing when appropriate, such as `git status`, `ci checks`, or `deploy`.
- Avoid huge paragraphs. Break ideas into short command-like blocks.

## Color System

Use Gruvbox dark as the base.

```css
:root {
  --bg0: #282828;
  --bg0-hard: #1d2021;
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
  --purple: #b16286;
  --purple-bright: #d3869b;
  --aqua: #689d6a;
  --aqua-bright: #8ec07c;
  --orange: #d65d0e;
  --orange-bright: #fe8019;
}
```

Usage:

- Backgrounds: `--bg0-hard`, `--bg0`, `--bg0-soft`
- Main text: `--fg1`
- Muted text: `--fg3` or `--fg4`
- Positive/pass: `--green-bright`
- Warning/manual approval: `--yellow-bright`
- Failure/error: `--red-bright`
- Links, branches, commands: `--blue-bright`
- Prompts and active cursor: `--orange-bright`

Do not add unrelated accent colors. The palette should stay recognizably Gruvbox.

## Global Layout

Each slide should feel like one of these terminal states:

- full-screen Vim buffer
- split Vim panes
- terminal command output
- Git diff view
- CI log view
- deployment dashboard rendered as terminal text
- statusline summary

Use a persistent frame:

```text
┌────────────────────────────────────────────────────────────┐
│ slide-name.md                         │
├────────────────────────────────────────────────────────────┤
│ slide content                                               │
├────────────────────────────────────────────────────────────┤
│ NORMAL  slide 04/38  main  +ci  12:42                      │
└────────────────────────────────────────────────────────────┘
```

The frame does not need literal box drawing on every slide, but the visual structure should imply it:

- top bar with file name or current module
- main content area
- bottom Vim statusline
- optional command prompt row for key takeaways

## Slide Composition

Use a small set of repeatable slide templates.

### Title Slide

Looks like opening Vim on the lecture file.

Elements:

- large title as file heading
- subtitle as terminal comment
- blinking block cursor after the title or command
- bottom statusline showing `NORMAL`, `main`, and `lecture/structure.md`

Example:

```text
# From Vibe Code to Live Product█

" DevOps, Git workflow, CI/CD, GitHub Actions, and deployment
" for AI-assisted builders
```

### Concept Slide

For definitions like DevOps, Git, CI, CD, deployment, rollback.

Layout:

- left pane: simple definition
- right pane: concrete terminal model or process flow
- bottom command row: the single sentence students should remember

### Workflow Slide

For Git workflow, PR workflow, demo plan, and team rules.

Layout:

- sequential command-style steps
- active step highlighted in orange or yellow
- passed steps marked green
- blocked/failing steps marked red

Example:

```text
$ git checkout -b feature/add-login
$ ai-agent edit --scope frontend
$ git diff
$ npm test
$ gh pr create
```

### Code Slide

For YAML, environment variables, prompts, and rules.

Layout:

- code editor pane with line numbers
- syntax colors from Gruvbox
- short annotations in a side gutter
- avoid more than 12 visible lines unless the slide is specifically about reading a workflow file

### Comparison Slide

For bad prompt vs better prompt, CI vs CD, Vercel vs Railway vs Render.

Layout:

- two or three Vim splits
- labels in statusline-style tabs
- red/yellow/green status indicators
- no decorative cards

### Checklist Slide

For student checklist and minimal team rules.

Layout:

- terminal checklist with `[ ]` and `[x]`
- active command prompt at the bottom
- use green for completed safety rules, yellow for manual decisions

## Visual Details

Use:

- 1px borders in `--bg2` or `--bg3`
- hard rectangular geometry
- 0 to 4px border radius only
- subtle scanline or grain texture if it does not reduce readability
- terminal cursor, caret, and selected-line states
- line numbers for code-like sections
- Vim mode labels: `NORMAL`, `INSERT`, `VISUAL`, `COMMAND`
- branch labels such as `main`, `feature/add-login`, and `deploy`
- CI badges rendered as text, not glossy pills

Avoid:

- rounded marketing cards
- glassmorphism
- purple gradients
- decorative blobs
- stock illustrations
- fake 3D dashboards
- oversized hero sections after the title slide
- long paragraphs centered on a blank background

## Motion

Motion should be minimal and purposeful.

Good motion:

- cursor blink
- line-by-line terminal output
- active pane focus change
- statusline update
- checkmark changing from pending to passed
- failed command briefly flashing red
- slide transition that resembles switching Vim buffers

Avoid:

- bouncing elements
- parallax decoration
- spinning icons
- heavy page-load choreography
- motion that delays reading the content

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

Recommended component names:

```text
Deck
Slide
TerminalFrame
VimTopBar
VimStatusLine
TerminalPane
CodeBlock
CommandLine
DiffView
WorkflowSteps
ComparisonSplit
Checklist
```

Keep content and presentation separate:

- `lecture/structure.md` should remain the source for lecture content.
- React slide data can be generated from Markdown or manually mapped from the structure.
- Visual components should be reusable across slides.
- Avoid hard-coding one-off layouts unless a slide genuinely needs a special composition.

## Content Treatment

Make key ideas appear as terminal output or Vim command messages.

Examples:

```text
:set main=deployable
:check ci
:deploy --platform vercel
:rollback HEAD~1
```

Use shell prompts for actions:

```text
$ git status
$ git diff
$ npm run build
$ gh pr create
```

Use comments for speaker-like explanation:

```text
" AI can generate code fast.
" DevOps decides what is trusted and shipped.
```

Use error output for failure examples:

```text
error: build failed
hint: check changed files before asking AI to fix everything
```

## Accessibility

Requirements:

- Maintain strong contrast between text and background.
- Keep code font sizes large enough for projection.
- Do not rely on color alone; pair status colors with text labels like `PASS`, `FAIL`, `WARN`.
- Use semantic React structure where possible.
- Ensure keyboard navigation works for presenter controls.
- Avoid blinking effects that are too fast or distracting.

## Implementation Notes

Load JetBrains Mono through a local font file if possible. If using a hosted source, include a fallback stack and make sure the deck remains usable without network access.

Suggested CSS defaults:

```css
html,
body,
#root {
  min-height: 100%;
  margin: 0;
  background: var(--bg0-hard);
  color: var(--fg1);
  font-family: "JetBrains Mono", "JetBrainsMono Nerd Font", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

* {
  box-sizing: border-box;
}
```

Use CSS variables for theme values so the palette can be adjusted once.

## Design Success Criteria

The presentation is successful if:

- screenshots are immediately recognizable as terminal/Vim inspired
- the deck stays readable on projector screens
- students can follow the process flow without knowing DevOps jargon
- code examples feel real and useful
- every slide reinforces the core mental model:

```text
AI writes code.
Git tracks code.
Pull requests inspect code.
CI checks code.
CD deploys code.
Logs explain what happened.
Rollback saves the release.
```
