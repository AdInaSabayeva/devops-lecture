# From Vibe Code to Live Product

Lecture structure for incubator students who build mostly alone and rely heavily on AI agents.

Style:

- minimalistic
- nerdy and technical
- low jargon at first, precise terms after
- friendly to non-CS students
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
FROM VIBE CODE
TO LIVE PRODUCT

AI agent -> git -> ci -> deploy -> observe

goal:
  ship faster
  break less
  rollback when needed

translation:
  deploy = put online
  observe = check what happened
```

### Text

This lecture is about the path from "AI generated my app" to "real users can use it." Some students may not have a computer science background, so define terms before using them deeply. We are not trying to become full DevOps engineers today. We are learning enough process to stop AI-generated projects from turning into chaos.

---

## Slide 2: The Real Problem

### Display

```text
local:
  AI generated code
  npm run dev works
  demo looks fine

production:
  missing env var
  build command fails
  database not connected
  500 error
  no logs checked
  unknown deployed version

translation:
  local = your laptop
  production = real users
  500 = server crashed
```

### Text

AI agents are very good at producing code, but production is not only code. Production has dependencies, secrets, servers, domains, logs, builds, and deployment rules. The failure often appears after the code is written.

---

## Slide 3: Your New Role

### Display

```text
AI = code generator

you = release manager

responsibilities:
  accept / reject changes
  run checks
  deploy
  rollback

plain version:
  decide what goes online
  know how to undo it
```

### Text

Even if you do not manually write code, you still decide what is accepted, what is merged, what is deployed, and what happens if it breaks. For solo builders, DevOps is not team bureaucracy. It is self-defense.

---

## Slide 4: DevOps In One Pipeline

### Display

```text
devops pipeline:

  edit
    -> git commit
    -> ci checks
    -> build artifact
    -> deploy
    -> logs / metrics

no pipeline = random shipping

plain version:
  make change
  save checkpoint
  robot checks it
  publish it
  watch for errors
```

### Text

DevOps is the repeatable process around shipping software. For non-CS students, frame it like logistics: version control tracks the package, CI checks the package, deployment delivers it, and logs are the delivery report.

---

## Slide 5: The AI Safety Loop

### Display

```text
safe AI loop:

  small prompt
    -> inspect diff
    -> run checks
    -> commit checkpoint
    -> deploy preview
    -> merge / rollback

anti-pattern:
  "rewrite the whole app"

why:
  small change = easy to inspect
  huge change  = hard to trust
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

mental model:
  git = save slots for code

$ git status
$ git diff
$ git commit -m "add login page"
```

### Text

For AI users, Git is not optional. Explain Git as checkpoints before introducing commands. Without Git, AI edits are just mysterious file changes. With Git, every AI change becomes inspectable. The most important command concept is `diff`: what changed since the last checkpoint?

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

mental model:
  main   = official version
  branch = sandbox

$ git switch -c feature/login
# AI edits here
$ git diff
$ git push origin feature/login

rule:
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

plain version:
  "show me what changed before I accept it"

PR shows:
  changed files
  CI result
  comments / notes
  preview URL

merge only when:
  diff understood
  checks green
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

plain version:
  github runs commands to check your app

on every push / PR:
  install dependencies
  lint
  test
  build

minimum:
  npm ci
  npm test
  npm run build
```

### Text

Continuous Integration runs checks automatically when code changes. For non-CS students, call it a robot quality-control gate. CI does not guarantee the app is perfect, but it catches obvious failures before deployment.

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
CI:
  checks the change

CD:
  ships the accepted change

plain version:
  CI = test before trust
  CD = put trusted version online

delivery:
  human approves production

deployment:
  production release is automatic
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
deployment checklist:

  build command
  start command
  runtime version
  env variables
  domain / DNS
  logs
  rollback path

example:
  npm run build
  npm run start

plain version:
  build = prepare app
  start = run app
  domain = website address
  logs = error history
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

## Slide 13: Static Site Generation

### Display

```text
static site

source code
  -> build
  -> static files
  -> CDN

html / css / js

hosts:
  github pages
  cloudflare pages
  netlify
  vercel

plain version:
  no server code running
  just files served very fast
```

### Text

Static sites are the simplest deployment model. The app is built into files, then a platform serves those files from a CDN. For non-CS students, describe it as uploading finished pages instead of running a live application server.

Common options:

```text
GitHub Pages
Cloudflare Pages
Netlify
Vercel
Render Static Sites
```

Use static hosting for:

```text
landing pages
portfolios
documentation
blogs
frontend-only demos
client-side React/Vue/Svelte apps
```

Not enough when you need:

```text
backend API
database writes
auth server
background jobs
server-side business logic
```

Good mental model:

```text
static site = cheapest + simplest + fastest
```

---

## Slide 14: Vercel

### Display

```text
vercel

best for:
  next.js / react
  frontend MVP
  landing page
  preview deploys

git push -> preview URL
merge main -> production

not ideal for:
  long-running workers
  custom server ops

plain version:
  easiest "connect github and get a URL" option
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

## Slide 15: Railway / Render

### Display

```text
railway / render

best for:
  backend api
  database
  full-stack mvp
  docker-ish apps

decision:
  frontend only      -> vercel
  api + database     -> railway/render
  cron/job/worker    -> railway/render
  simple docker app  -> railway/render

plain version:
  use when your app needs a backend or database
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

## Slide 16: VPS

### Display

```text
VPS = remote linux machine

plain version:
  a rented computer that is always online

you get:
  ssh access
  root/admin control
  fixed server

you run:
  app
  db
  docker
  nginx

you maintain:
  updates
  firewall
  backups
```

### Text

A VPS is a rented server on the internet. It is like renting a computer that stays on in a data center. You can install a web server, backend app, database, Docker, workers, monitoring, and deployment scripts.

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

## Slide 17: Docker / Compose / Portainer

### Display

```text
docker compose

plain version:
  run several app parts together

one server, many services:

  app     -> :3000
  api     -> :8000
  db      -> postgres
  redis   -> cache
  worker  -> background jobs
  nginx   -> public traffic

tools:
  compose / portainer / coolify
```

### Text

Docker packages an app with its runtime. For non-CS students, frame it as a shipping box for software. Docker Compose runs multiple boxes together on one machine. This is useful when a project has a backend, database, cache, worker, and reverse proxy.

Common small-server stack:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"

  db:
    image: postgres:16

  redis:
    image: redis:7
```

Useful options:

```text
Docker Compose     -> simple multi-service setup
Portainer          -> web UI for Docker management
Dokku              -> small Heroku-like PaaS on your VPS
CapRover           -> self-hosted app platform
Coolify            -> self-hosted alternative to Vercel/Heroku
```

Kubernetes note:

```text
Kubernetes is powerful, but usually not worth it for small-medium projects.
Use it when you really need orchestration across many servers.
```

---

## Slide 18: Nginx

### Display

```text
nginx

plain version:
  traffic controller for your server

public internet:
  https://app.com
  https://api.app.com

nginx:
  :80 / :443
    -> app:3000
    -> api:8000

jobs:
  reverse proxy
  tls/https
  domain routing
```

### Text

Nginx is commonly used as a web server and reverse proxy. For non-CS students, call it the front desk: it receives public traffic and forwards each request to the right internal service.

Typical jobs:

```text
serve static files
reverse proxy to backend
route domains/subdomains
terminate HTTPS
compress responses
basic rate limiting
```

Mental model:

```text
browser -> nginx -> app container
```

Example:

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
  }
}
```

In many beginner platforms, Vercel/Railway/Render hide this layer. On a VPS, you often manage it yourself.

---

## Slide 19: Cloud Credits

### Display

```text
free credits:

  github education pack
  oracle cloud
  microsoft azure
  google cloud
  amazon aws
  digitalocean

warning:
  free credits != free forever

check:
  billing alerts
  unused resources
  auto-scaling
```

### Text

Students can often get free credits or free resources through GitHub Education Pack, Oracle, Microsoft Azure, Google Cloud, Amazon AWS, and DigitalOcean.

Important warning:

```text
free credits != free forever
```

Always check billing limits, alerts, auto-scaling, and unused resources. Cloud platforms can start charging when resources stay running.

---

## Slide 20: AWS / Azure / Google Cloud

### Display

```text
aws / azure / gcp

plain version:
  giant cloud platforms for serious scale

pros:
  scalable
  managed databases
  advanced networking
  enterprise services

cons:
  harder setup
  billing complexity
  more concepts

use only when scale/business requires it
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

## Slide 21: Secrets

### Display

```text
code != secrets

plain version:
  secrets are passwords for your app

DATABASE_URL
API_KEY
JWT_SECRET

bad:
  committed .env
  hardcoded token

good:
  github secrets
  vercel env vars
  railway/render env
  cloud secret manager
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

## Slide 22: Rollback And Logs

### Display

```text
deploy broke?

plain version:
  first understand, then undo

1. read logs
2. identify failing version
3. rollback
4. verify health

rollback options:
  redeploy previous version
  revert commit
  restore docker image
  disable feature
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

## Slide 23: Live Demo Flow

### Display

```text
branch
  -> AI change
  -> diff
  -> commit
  -> PR
  -> CI green
  -> merge
  -> deploy
  -> logs

demo target:
  one small feature
  one visible deploy
  one rollback explanation

plain version:
  show the safety process, not a big feature
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

## Slide 24: Final Checklist

### Display

```text
before merge:
  diff reviewed
  tests pass
  build passes
  secrets safe
  deploy target known
  rollback known

before production:
  env configured
  logs visible
  previous version available

rule:
  vibe code != vibe deploy
```

### Text

This is the practical checklist for solo AI builders. It does not matter if the code was handwritten or generated. What matters is whether the change is understandable, checked, deployable, and reversible.

Final takeaway:

```text
you can vibe code
but do not vibe deploy
```
