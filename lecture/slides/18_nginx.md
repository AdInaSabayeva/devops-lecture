## Slide 18: Nginx

### Display

```text
nginx

plain version:
  traffic controller for your server

public internet:
  https://app.com
  https://api.app.com

nginx:
  :80 / :443
    -> app:3000
    -> api:8000

jobs:
  reverse proxy
  tls/https
  domain routing
```

### Text

Nginx is commonly used as a web server and reverse proxy. For non-CS students, call it the front desk: it receives public traffic and forwards each request to the right internal service.

Typical jobs:

```text
serve static files
reverse proxy to backend
route domains/subdomains
terminate HTTPS
compress responses
basic rate limiting
```

Mental model:

```text
browser -> nginx -> app container
```

Example:

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://localhost:3000;
  }
}
```

In many beginner platforms, Vercel/Railway/Render hide this layer. On a VPS, you often manage it yourself.

---
