## Slide 8: Pull Request As Self-Review

### Display

```text
PR = inspection gate

why it matters:
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
