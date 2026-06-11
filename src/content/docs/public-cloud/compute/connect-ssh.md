---
title: Connect With SSH
sidebar_position: 3
---

Manage your instance using a terminal and SSH for secure remote access.

## Prerequisites

Before connecting, ensure you have:

- **IP Address**: Available on the instance card or Instance Overview.
- **Default Username**: Depending on OS (`root`, `ubuntu`, `ec2-user`).
- **Authentication Method**: SSH Key (recommended) or Default Password (found in Instance Overview).

:::note

Screenshots coming.

:::

## Connecting

Open a terminal (Command Prompt/PowerShell on Windows, built-in terminal on macOS/Linux).

**With SSH Key:**

```bash
ssh -i /path/to/your/private/key username@ip_address
```

**With password:**

```bash
ssh username@ip_address
```

Example:

```bash
ssh root@192.168.1.1
```

:::note

Screenshots coming.

:::

## See also

- [Connect With RDP](/public-cloud/compute/connect-rdp)
- [Console Access](/public-cloud/compute/console-access)
- [SSH Keys](/public-cloud/compute/settings/ssh-keys)
