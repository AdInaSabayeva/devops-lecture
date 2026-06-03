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
