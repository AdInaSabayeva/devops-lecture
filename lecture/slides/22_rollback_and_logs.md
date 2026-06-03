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
