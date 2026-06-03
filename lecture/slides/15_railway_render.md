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

why it matters:
  use when your app needs a backend or database
```

### Text

Railway and Render are good when the app needs more than a frontend. They are common choices for APIs, full-stack MVPs, databases, cron jobs, and Docker deployments that need managed hosting.

Decision:

```text
Need frontend only?       -> Vercel
Need API + database?      -> Railway or Render
Need scheduled jobs?      -> Render or Railway
Need simple Docker app?   -> Render or Railway
```

For most incubator projects, Vercel, Railway, or Render is enough.

---
