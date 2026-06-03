## Slide 17: Docker / Compose / Portainer

### Display

```text
docker compose

meaning:
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
