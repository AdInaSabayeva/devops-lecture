## Slide 11: CD And Deployment

### Display

```text
CI:
  checks the change

CD:
  ships the accepted change

plain version:
  CI = test before trust
  CD = put trusted version online

delivery:
  human approves production

deployment:
  production release is automatic
```

### Text

Deployment means making the app available to users. Continuous Delivery means the app is ready to deploy, but a human approves. Continuous Deployment means passing code ships automatically.

For early solo projects, use this:

```text
automatic preview deploys
manual production deploy when needed
```

---
