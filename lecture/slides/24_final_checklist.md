## Slide 24: Final Checklist

### Display

```text
before merge:
  diff reviewed
  tests pass
  build passes
  secrets safe
  deploy target known
  rollback known

before production:
  env configured
  logs visible
  previous version available

rule:
  vibe code != vibe deploy
```

### Text

This is the practical checklist for solo AI builders. It does not matter if the code was handwritten or generated. What matters is whether the change is understandable, checked, deployable, and reversible.

Final takeaway:

```text
you can vibe code
but do not vibe deploy
```
