## Slide 21: Secrets

### Display

```text
code != secrets

meaning:
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
