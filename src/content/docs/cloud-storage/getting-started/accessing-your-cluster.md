---
title: Accessing Your Cluster
sidebar_position: 2
---

# Accessing Your Cluster

Your [credentials document](./provisioning#what-you-receive) holds the endpoints and credentials
below. Replace the placeholders with the values for your cluster.

## Ceph Dashboard

The Ceph Dashboard is the web UI for monitoring and managing your cluster. Use the URL and login
from your credentials document. From the dashboard you:

- View cluster health, capacity, and OSD status
- Manage pools and device classes
- Create and manage object-storage (RGW) users and buckets

## Object storage (S3)

Your cluster exposes an S3-compatible endpoint via Ceph RGW. Point any S3 client at the endpoint URL
from your credentials document:

```bash
aws s3 ls --endpoint-url https://<rgw-endpoint>
```

See [Object Storage](../reference/object-storage) for clients, keys, and usage.

## Administrative (root) access

ZCS clusters are single-tenant with root-level access, so you administer Ceph directly. For example,
check status from an admin host:

```bash
ceph status
ceph osd df tree
```

Your credentials document lists the access method: admin host, SSH, or dashboard.

:::caution

Root access lets you reconfigure pools, CRUSH rules, and OSDs directly. Changes to data placement
and replication affect durability and performance. Plan them carefully. Ask ZSoftly support to
review a change first if you want a second set of eyes.

:::

## Next steps

- [Object Storage](../reference/object-storage). S3 endpoint and clients.
- [Block Storage](../reference/block-storage). RBD volumes.
- [File Storage](../reference/file-storage). CephFS shared filesystem.
- [Replication & DR](../reference/replication-dr). Protect and replicate your data.
