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
