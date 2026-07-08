---
title: Dify
---

Dify is an open-source platform for building LLM applications and AI agents. It combines a visual
workflow builder, retrieval-augmented generation (RAG) pipelines, prompt management, and an agent
framework so teams can design, test, and deploy generative-AI apps from one interface.

## Software included

| Component      | Version       |
| -------------- | ------------- |
| Dify           | 1.15.0        |
| Docker         | Latest stable |
| Docker Compose | Latest stable |
| Ubuntu         | 24.04 LTS     |

Dify runs as a multi-container Docker Compose stack (API, worker, web, PostgreSQL, Redis, Weaviate
vector store, and nginx).

## Requirements

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| vCPU     | 2       | 4           |
| RAM      | 4 GB    | 8 GB        |
| Storage  | 40 GB   | 80 GB       |

RAM and storage requirements grow with usage.

## Environment variables

You can optionally set these when deploying Dify from the marketplace. Leave any field blank to have
a secure random value generated automatically.

| Variable             | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| `DIFY_PUBLIC_URL`    | Public base URL (for example `https://dify.example.com`) for console, API, and webhooks |
| `DIFY_INIT_PASSWORD` | Optional password that gates the one-time `/install` setup wizard                       |
| `DIFY_ENABLE_HTTPS`  | Set to `true` to have the bundled nginx serve HTTPS. Defaults to `false`                |

## Getting started

### 1. Connect to your VM

```bash
ssh ubuntu@<your-vm-ip>
```

### 2. Wait for first-boot configuration

On the first boot, a setup script generates the internal database and Redis secrets, writes the
environment file, and starts the stack with Docker Compose. This takes a few minutes while the
containers become healthy. Track progress:

```bash
journalctl -u dify-first-boot.service -f
```

The login message (MOTD) confirms when Dify is ready and prints the internal credentials.

### 3. Complete the admin setup

Open a browser and complete the one-time admin setup:

```text
http://<your-vm-ip>/install
```

Create the admin account (email and password of your choice), then sign in at
`http://<your-vm-ip>/`. If you set `DIFY_INIT_PASSWORD`, enter it first to open the wizard.

### 4. Add a model provider

From **Settings → Model Provider**, add an LLM provider (such as OpenAI, Anthropic, or a self-hosted
Ollama endpoint) before building apps.

### 5. Review the generated credentials

The internal database and Redis passwords are written to a root-only file:

```bash
sudo cat /etc/dify/credentials.txt
```

## Managing Dify

Dify runs as a Docker Compose stack in `/opt/dify/docker`.

```bash
# Check status
cd /opt/dify/docker && docker compose ps

# Restart
cd /opt/dify/docker && docker compose restart

# View logs
cd /opt/dify/docker && docker compose logs -f
```

Environment configuration: `/opt/dify/docker/.env`. Persistent data is stored under
`/opt/dify/docker/volumes`.

## Security

Ports 80 and 443 are open on the VM's network interface. UFW is enabled and allows SSH (port 22),
HTTP (80), and HTTPS (443).

Dify serves plain HTTP by default. **For production use**, set `DIFY_PUBLIC_URL` to your domain and
enable HTTPS, either through the bundled nginx (`DIFY_ENABLE_HTTPS=true` with your own certificates)
or your own reverse proxy. Apply `.env` changes with:

```bash
cd /opt/dify/docker && docker compose down && docker compose up -d
```

## Next steps

- [Dify documentation](https://docs.dify.ai/)
- [Dify self-hosting guide](https://docs.dify.ai/en/getting-started/install-self-hosted/docker-compose)
