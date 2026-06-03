# From Vibe Code to Live Product

Lecture structure for incubator students who build mostly alone and rely heavily on AI agents.

Style:

- minimalistic
- nerdy and technical
- low jargon at first, precise terms after
- slides show little text
- speaker text explains the idea
- code snippets are allowed when they clarify the workflow

Core message:

```text
AI writes code fast.
DevOps controls what code becomes real.
```

---

## Slide 1: Title

### Display

```text
from vibe code
to live product

git -> ci -> deploy -> observe
```

### Text

This lecture is about the path from "AI generated my app" to "real users can use it." We are not trying to become full DevOps engineers today. We are learning enough process to stop AI-generated projects from turning into chaos.

---

## Slide 2: The Real Problem

### Display

```text
AI made it work locally.

production:
  500
  missing env
  broken build
  unknown version
```

### Text

AI agents are very good at producing code, but production is not only code. Production has dependencies, secrets, servers, domains, logs, builds, and deployment rules. The failure often appears after the code is written.

---

## Slide 3: Your New Role

### Display

```text
AI = code generator
you = release manager
```

### Text

Even if you do not manually write code, you still decide what is accepted, what is merged, what is deployed, and what happens if it breaks. For solo builders, DevOps is not team bureaucracy. It is self-defense.

---

## Slide 4: DevOps In One Pipeline

### Display

```text
edit
  -> commit
  -> test
  -> build
  -> deploy
  -> logs
```

### Text

DevOps is the repeatable process around shipping software. Git tracks the change. CI verifies the change. Deployment makes it live. Logs tell us what happened after release.

---

## Slide 5: The AI Safety Loop

### Display

```text
small prompt
  -> diff
  -> run checks
  -> commit
  -> deploy
```

### Text

The main rule with AI agents is to keep changes small and inspectable. A huge AI rewrite is hard to review and hard to rollback. A small change can be checked, committed, and reversed.

Better prompt:

```text
Add a login page.
Touch only frontend files.
Do not change database schema.
Show changed files before final answer.
```

---

## Slide 6: Git Is A Time Machine

### Display

```text
repo    = project + history
commit  = checkpoint
branch  = experiment
diff    = what changed
revert  = undo safely
```

### Text

For AI users, Git is not optional. Without Git, AI edits are just mysterious file changes. With Git, every AI change becomes inspectable. The most important command concept is `diff`: what changed since the last checkpoint?

Useful commands:

```bash
git status
git diff
git add .
git commit -m "add login page"
```

---

## Slide 7: Branches For Solo Builders

### Display

```text
main = stable
branch = experiment

never vibe directly on main
```

### Text

Even when working alone, branches are useful. `main` should represent the stable version. A branch is where the AI agent can experiment. If the branch becomes bad, delete it or revert it without damaging the stable version.

Flow:

```bash
git switch -c feature/login
# let AI edit
git diff
git commit -am "add login"
```

---

## Slide 8: Pull Request As Self-Review

### Display

```text
PR = inspection gate

changed files
checks
preview
merge
```

### Text

Pull requests are not only for teams. A solo builder can use a pull request as a review screen. GitHub shows changed files, CI results, comments, and preview deployments. It forces you to pause before merging AI output into the stable branch.

Solo rule:

```text
If the change matters, use a PR.
```

---

## Slide 9: CI

### Display

```text
CI = robot checker

install
lint
test
build
```

### Text

Continuous Integration runs checks automatically when code changes. CI does not guarantee the app is perfect, but it catches obvious failures before deployment.

Minimum checks:

```text
npm ci
npm test
npm run build
```

Main rule:

```text
Do not trust AI code until the build passes.
```

---

## Slide 10: GitHub Actions

### Display

```yaml
on: [pull_request, push]
jobs:
  check:
    runs-on: ubuntu-latest
```

### Text

GitHub Actions is automation inside GitHub. A workflow file says: when something happens, run these commands on a GitHub machine.

Minimal CI workflow:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
```

Do not memorize YAML. Learn how to read the structure.

---

## Slide 11: CD And Deployment

### Display

```text
CI checks
CD ships

delivery    = human approves
deployment  = automatic release
```

### Text

Deployment means making the app available to users. Continuous Delivery means the app is ready to deploy, but a human approves. Continuous Deployment means passing code ships automatically.

For early solo projects, use this:

```text
automatic preview deploys
manual production deploy when needed
```

---

## Slide 12: Deployment Is More Than Upload

### Display

```text
deploy requires:

env
build
runtime
domain
logs
rollback
```

### Text

Deployment fails when one of these pieces is missing. AI often writes code that assumes environment variables exist or that a server works a certain way. Always check the runtime requirements before deploying.

Questions:

```text
What command builds the app?
What command starts the app?
What secrets does it need?
Where are logs?
How do I rollback?
```

---

## Slide 13: Vercel

### Display

```text
vercel

best for:
  frontend
  next.js
  static sites
  preview deploys
```

### Text

Vercel is usually the easiest option for frontend-heavy projects: Next.js, React, landing pages, portfolios, static sites, and simple serverless routes.

Where it is enough:

```text
frontend MVP
landing page
demo product
simple SaaS prototype
```

Where it may not be enough:

```text
long-running backend
custom server control
complex infrastructure
heavy background jobs
```

---

## Slide 14: Railway / Render

### Display

```text
railway / render

best for:
  backend api
  database
  full-stack mvp
  docker-ish apps
```

### Text

Railway and Render are good when the app needs more than a frontend. They are common choices for APIs, full-stack MVPs, databases, cron jobs, and simple Docker deployments.

Decision:

```text
Need frontend only?       -> Vercel
Need API + database?      -> Railway or Render
Need scheduled jobs?      -> Render or Railway
Need simple Docker app?   -> Render or Railway
```

For most incubator projects, Vercel, Railway, or Render is enough.

---

## Slide 15: VPS

### Display

```text
VPS = remote linux machine

you control it
you maintain it
```

### Text

A VPS is a rented server on the internet. You can install a web server, backend app, database, Docker, workers, monitoring, and deployment scripts.

Use a VPS when you need:

```text
more control
fixed monthly cost
long-running processes
custom server setup
learning real ops
```

But you also manage:

```text
updates
firewall
backups
logs
security
uptime
```

---

## Slide 16: Cloud Credits

### Display

```text
free credits:

github education pack
oracle
azure
google cloud
aws
digitalocean
```

### Text

Students can often get free credits or free resources through GitHub Education Pack, Oracle, Microsoft Azure, Google Cloud, Amazon AWS, and DigitalOcean.

Important warning:

```text
free credits != free forever
```

Always check billing limits, alerts, auto-scaling, and unused resources. Cloud platforms can start charging when resources stay running.

---

## Slide 17: AWS / Azure / Google Cloud

### Display

```text
aws / azure / gcp

powerful
scalable
hard
```

### Text

AWS, Azure, and Google Cloud are worth learning, but they are not always the right starting point. They are powerful when you need scale, advanced networking, managed services, compliance, or enterprise-grade infrastructure.

For incubator projects:

```text
start simple:
  vercel / railway / render / vps

move to cloud when:
  scale requires it
  architecture requires it
  business requires it
```

Do not use complex cloud just to look serious.

---

## Slide 18: Secrets

### Display

```text
code != secrets

DATABASE_URL
API_KEY
JWT_SECRET
```

### Text

Secrets do not belong in GitHub code. AI agents sometimes paste `.env` values or API keys into files. That is dangerous.

Use platform secret storage:

```text
GitHub Actions Secrets
Vercel Environment Variables
Railway Variables
Render Environment
cloud secret managers
```

Rule:

```text
commit code
configure secrets
```

---

## Slide 19: Rollback And Logs

### Display

```text
deploy broke?

logs -> cause
rollback -> recover
```

### Text

Every deployment should have a way back. Logs help identify what happened. Rollback restores a previous working version.

Rollback options:

```text
redeploy previous version
revert commit
restore previous image
disable broken feature
```

Before deploying, ask:

```text
If this breaks, how do I go back in 5 minutes?
```

---

## Slide 20: Live Demo Flow

### Display

```text
branch
  -> AI change
  -> diff
  -> CI
  -> deploy
  -> logs
```

### Text

Demo with one small AI-generated app. Add one feature, not a full rewrite. The point is to show the process.

Demo steps:

```text
1. create branch
2. ask AI for one small change
3. inspect diff
4. commit and push
5. open PR
6. watch GitHub Actions
7. merge
8. deploy
9. open logs
10. explain rollback
```

---

## Slide 21: Final Checklist

### Display

```text
before merge:
  diff reviewed
  tests pass
  build passes
  secrets safe
  deploy target known
  rollback known
```

### Text

This is the practical checklist for solo AI builders. It does not matter if the code was handwritten or generated. What matters is whether the change is understandable, checked, deployable, and reversible.

Final takeaway:

```text
you can vibe code
but do not vibe deploy
```

