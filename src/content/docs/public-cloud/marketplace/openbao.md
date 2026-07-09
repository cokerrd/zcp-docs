---
title: OpenBao
---

OpenBao is an open-source secrets management platform that securely stores and controls access to
tokens, passwords, certificates, and encryption keys. It is the Linux Foundation community fork of
HashiCorp Vault and remains API-compatible with it, so most Vault tooling works unchanged. You run
it as a server, initialise it once, and unseal it to start serving secrets.

## Software included

| Component | Version   |
| --------- | --------- |
| OpenBao   | 2.5.5     |
| Ubuntu    | 24.04 LTS |

OpenBao runs as a systemd service with integrated Raft storage. Each VM generates its own TLS
certificate on first boot, so no private key is shared between deployments.

:::caution

This image deploys a single node. A one-node Raft cluster has no failover. For high availability,
provision more instances from this template and join them as Raft peers.

:::

## Requirements

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| vCPU     | 1       | 2           |
| RAM      | 1 GB    | 2 GB        |
| Storage  | 10 GB   | 20 GB       |

## Environment variables

You can optionally set these when deploying OpenBao from the marketplace. Leave them blank to use
the VM's own address and receive the generated secrets in plain text.

| Variable                     | Description                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `OPENBAO_ADDR`               | Address embedded in the TLS certificate and the Raft cluster address                   |
| `OPENBAO_UNSEAL_PGP_KEYS`    | Comma-separated PGP public keys. Each unseal key share comes back encrypted to one key |
| `OPENBAO_ROOT_TOKEN_PGP_KEY` | One PGP public key. The root token comes back encrypted to it                          |

Each PGP entry is either `keybase:<username>` or a base64-encoded ASCII-armored public key. These
variables do not let you choose the secret values. OpenBao always generates the root token and the
unseal keys. They control only who those values are encrypted to.

:::note

When you supply `OPENBAO_UNSEAL_PGP_KEYS`, the number of keys becomes the unseal key-share count and
threshold, and the VM cannot unseal itself, because it never holds a private key. Decrypt your share
locally and run `bao operator unseal` yourself.

:::

## Getting started

### 1. Connect to your VM

```bash
ssh ubuntu@<your-vm-ip>
```

### 2. Wait for first-boot configuration

On the first boot, a setup script generates a TLS certificate for this VM, starts OpenBao,
initialises it with 5 key shares and a threshold of 3, and unseals it. Track progress:

```bash
journalctl -u openbao-first-boot.service -f
```

### 3. Retrieve the unseal keys and root token

They are written to a root-only file:

```bash
sudo cat /etc/openbao/credentials.txt
```

:::danger

Copy the unseal keys and the root token somewhere safe, then remove them from the VM. Anyone holding
the root token has full control of your secrets, and losing the unseal keys makes the data
unrecoverable.

:::

### 4. Use the API

```bash
export BAO_ADDR=https://<your-vm-ip>:8200
export BAO_SKIP_VERIFY=true
bao status
```

The certificate is self-signed, so either trust it or set `BAO_SKIP_VERIFY` while testing. Replace
it with your own certificate for production.

## Managing OpenBao

```bash
# Check status
sudo systemctl status openbao

# Restart
sudo systemctl restart openbao

# View logs
sudo journalctl -u openbao -f
```

Configuration lives in `/etc/openbao`, the Raft data in `/opt/openbao/data`, and the per-VM
certificate in `/etc/openbao/tls`.

## Security

Port 8200 is opened only after the service answers a health check over TLS. UFW is enabled and
allows that port plus SSH (port 22).

OpenBao seals itself whenever the service restarts. Unseal it again with three of your key shares:

```bash
bao operator unseal
```

**To restrict access to a specific IP:**

```bash
sudo ufw delete allow 8200/tcp
sudo ufw allow from <trusted-ip> to any port 8200
```

## Next steps

- [OpenBao documentation](https://openbao.org/docs/)
- [Seal and unseal concepts](https://openbao.org/docs/concepts/seal/)
- [Integrated Raft storage](https://openbao.org/docs/internals/integrated-storage/)
