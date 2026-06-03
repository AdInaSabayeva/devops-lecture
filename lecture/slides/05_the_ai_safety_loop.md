## Slide 5: The AI Safety Loop

### Display

```text
safe AI loop:

  small prompt
    -> inspect diff
    -> run checks
    -> commit checkpoint
    -> deploy preview
    -> merge / rollback

anti-pattern:
  "rewrite the whole app"

why:
  small change = easy to inspect
  huge change  = hard to trust
```

### Text

The main rule with AI agents is to keep changes small and inspectable. A huge AI rewrite is hard to review and hard to rollback. A small change can be checked, committed, and reversed.

Better prompt:

```text
Add a login page.
Touch only frontend files.
Do not change database schema.
Show changed files before final answer.
```

---
