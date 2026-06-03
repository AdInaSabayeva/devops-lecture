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

user-facing version:
  make change
  save checkpoint
  robot checks it
  publish it
  watch for errors
```

### Text

DevOps is the repeatable process around shipping software to people who need it to work. For non-CS students, frame it like logistics: version control tracks the package, CI checks the package, deployment delivers it, and logs tell you whether delivery succeeded.

---
