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
