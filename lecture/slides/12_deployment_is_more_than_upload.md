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
