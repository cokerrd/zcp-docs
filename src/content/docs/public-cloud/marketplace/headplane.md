---
title: Headplane
---

Headplane is a feature-complete web UI for [Headscale](https://headscale.net), the open-source,
self-hosted implementation of the Tailscale control server. It lets you manage nodes, pre-auth keys,
ACLs, and DNS from a browser instead of the Headscale CLI. Headplane does not replace Headscale. It
manages a running Headscale server, so this image ships both together.

:::tip[Headscale is the server, not the client]

The ZCP Tailscale marketplace app installs the Tailscale **client** that joins an existing tailnet.
Headscale is the self-hosted **control server** that a client connects to, and Headplane is its
admin UI. Run Headscale + Headplane here, then point your Tailscale clients at this server's URL.

:::

## Software included

| Component | Version       |
| --------- | ------------- |
| Headplane | 0.7.0         |
| Headscale | 0.29.2        |
| Docker    | Latest stable |
| Ubuntu    | 24.04 LTS     |

Headplane cannot run on its own, because every action it performs is an API call to Headscale. This
image runs the Headscale control server and the Headplane UI together as a Docker Compose stack.

## Requirements

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| vCPU     | 1       | 2           |
| RAM      | 1 GB    | 2 GB        |
| Storage  | 10 GB   | 20 GB       |

## Environment variables

These values are optional during marketplace deployment. Leave them blank to use the VM's own
address.

| Variable               | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `HEADSCALE_SERVER_URL` | Public URL your devices use to reach Headscale, such as an HTTPS domain |
| `HEADPLANE_BASE_URL`   | Public URL the Headplane UI is served from                              |

Set these when you front the VM with a DNS name or a TLS reverse proxy. `HEADSCALE_SERVER_URL` must
be an address reachable by your devices, otherwise nodes fail to register.

## Getting started

### 1. Connect to your VM

```bash
ssh ubuntu@<your-vm-ip>
```

### 2. Wait for first-boot configuration

On the first boot, a setup script writes the VM address into the Headscale and Headplane configs,
generates a session secret, starts both services, creates a Headscale user named `default`, and
mints an API key. This takes 1-2 minutes. Track progress:

```bash
journalctl -u headplane-first-boot.service -f
```

The login message (MOTD) confirms when Headplane is ready and prints the API key.

### 3. Retrieve the API key

The key is also written to a root-only file:

```bash
sudo cat /etc/headplane/credentials.txt
```

### 4. Sign in to Headplane

Open a browser and navigate to:

```text
http://<your-vm-ip>:3000/admin
```

Headplane authenticates against Headscale with an API key. Paste the key from the previous step into
the login form. The key expires after 90 days. Mint a new one at any time:

```bash
docker exec headscale headscale apikeys create --expiration 90d
```

### 5. Join a device

Point any Tailscale client at your Headscale server:

```bash
tailscale up --login-server http://<your-vm-ip>:8080
```

Approve the node from the Headplane UI, or list nodes from the CLI:

```bash
docker exec headscale headscale nodes list
```

## Managing Headplane

Headscale and Headplane run as a Docker Compose stack in `/opt/headplane`.

```bash
# Check status
cd /opt/headplane && docker compose ps

# Restart
cd /opt/headplane && docker compose restart

# View logs
cd /opt/headplane && docker compose logs -f headscale
```

Headscale's configuration is at `/opt/headplane/headscale/config/config.yaml` and its database under
`/opt/headplane/headscale/data`. ACL policies are stored in the database and remain editable from
the Headplane UI.

## Security

Ports 3000 (Headplane UI) and 8080 (Headscale) are open on the VM's network interface. UFW is
enabled and allows those ports plus SSH (port 22).

Your devices must reach Headscale on port 8080, but the Headplane UI does not need to be public.

**To restrict the UI to a specific IP:**

```bash
sudo ufw delete allow 3000/tcp
sudo ufw allow from <trusted-ip> to any port 3000
```

**For production use**, point a DNS record at the VM and terminate TLS with a reverse proxy (Caddy,
nginx, or Traefik). Set `HEADSCALE_SERVER_URL` and `HEADPLANE_BASE_URL` to the HTTPS URLs, and set
`cookie_secure: true` in `/opt/headplane/headplane/config.yaml`.

## Next steps

- [Headplane documentation](https://headplane.net)
- [Headscale documentation](https://headscale.net)
- [Headscale ACL policies](https://headscale.net/stable/ref/acls/)
