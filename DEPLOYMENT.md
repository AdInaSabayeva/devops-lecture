# Deployment Notes

This repository builds a static Vite site into an nginx container image and publishes it to GitHub Container Registry.

## Image Tags

The CI/CD workflow publishes images to:

```text
ghcr.io/<owner>/<repo>
```

Pushes to `main` publish a commit SHA tag and a branch tag. Prefer deploying immutable SHA tags rather than branch tags.

## Rollback

Redeploy the last known-good image SHA in your hosting platform, for example:

```bash
docker pull ghcr.io/<owner>/<repo>:<previous-good-sha>
docker run --rm -p 8080:8080 ghcr.io/<owner>/<repo>:<previous-good-sha>
curl -fsS http://127.0.0.1:8080/healthz
```

For Kubernetes-based deployments, update the image back to the previous-good SHA and verify rollout health:

```bash
kubectl set image deployment/devops-lecture site=ghcr.io/<owner>/<repo>:<previous-good-sha>
kubectl rollout status deployment/devops-lecture
```

## Docker Compose Production

Use `docker-compose.prod.yml` on a host where ports `80` and `443` are available. Configure the domain and image tag in an env file:

```bash
cp .env.production.example .env.production
docker compose --env-file .env.production -f docker-compose.prod.yml pull
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
curl -fsS https://example.com/healthz
```

`https-portal` terminates TLS and proxies to the internal `nginx` app service on port `8080`.
