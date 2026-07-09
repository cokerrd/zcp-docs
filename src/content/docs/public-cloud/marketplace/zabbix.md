---
title: Zabbix
---

Zabbix is an open-source monitoring platform for networks, servers, cloud services, and
applications. It collects metrics through agents, SNMP, IPMI, and agentless checks, then provides
alerting, visualization, and dashboards from a single web frontend. This image ships the Zabbix
server, web frontend, and agent with a MySQL backend on Apache.

## Software included

| Component | Version   |
| --------- | --------- |
| Zabbix    | 7.0 (LTS) |
| MySQL     | 8.0       |
| Apache    | 2.4.x     |
| Ubuntu    | 24.04 LTS |

## Requirements

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| vCPU     | 2       | 4           |
| RAM      | 2 GB    | 4 GB        |
| Storage  | 30 GB   | 60 GB       |

## Environment variables

This image takes no deploy-time variables. It creates no shared administrator password. Zabbix ships
with a default `Admin` password, and first boot replaces it with a value unique to your VM.

## Getting started

### 1. Connect to your VM

```bash
ssh ubuntu@<your-vm-ip>
```

### 2. Wait for first-boot configuration

On the first boot, a setup script initialises MySQL, imports the Zabbix schema, writes the frontend
configuration, starts the services, and rotates the default `Admin` password. Track progress:

```bash
journalctl -u zabbix-first-boot.service -f
```

The login message (MOTD) confirms when Zabbix is ready.

### 3. Retrieve the admin password

The credentials are written to a root-only file:

```bash
sudo cat /root/.credentials/zabbix.txt
```

### 4. Open the web frontend

Open a browser and navigate to:

```text
http://<your-vm-ip>/zabbix/
```

Sign in as `Admin` with the password from the previous step.

:::caution

Zabbix ships with a well-known default `Admin` password. This image replaces it on first boot, so do
not reuse the documented default from the upstream project.

:::

## Managing Zabbix

```bash
# Check status
sudo systemctl status zabbix-server apache2 mysql

# Restart the server
sudo systemctl restart zabbix-server

# View logs
sudo tail -f /var/log/zabbix/zabbix_server.log
```

Server configuration lives in `/etc/zabbix/zabbix_server.conf` and the frontend configuration in
`/etc/zabbix/web/`.

## Security

Port 80 (web frontend) and port 10051 (Zabbix server, used by agents to report in) are open on the
VM's network interface. UFW is enabled and allows those ports plus SSH (port 22).

**To restrict the web frontend to a specific IP:**

```bash
sudo ufw delete allow 80/tcp
sudo ufw allow from <trusted-ip> to any port 80
```

**For production use**, point a DNS record at the VM and front Apache with TLS, either with your own
certificate or a reverse proxy that terminates TLS.

## Next steps

- [Zabbix documentation](https://www.zabbix.com/documentation/7.0/en/)
- [Zabbix agent configuration](https://www.zabbix.com/documentation/7.0/en/manual/appendix/config/zabbix_agentd)
- [Zabbix API reference](https://www.zabbix.com/documentation/7.0/en/manual/api)
