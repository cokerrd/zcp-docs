---
title: Block Storage (RBD)
sidebar_position: 2
---

# Block Storage (RBD)

Ceph RBD (RADOS Block Device) provides thin-provisioned, replicated block devices backed by your
cluster. RBD volumes suit virtual machine disks, databases, and Kubernetes persistent volumes.

## Typical workflow

Create a pool and an image, then map it on a client. Run these from an admin host with access to the
cluster:

```bash
ceph osd pool create rbd-pool
rbd create rbd-pool/vol01 --size 100G
rbd map rbd-pool/vol01
mkfs.ext4 /dev/rbd0
mount /dev/rbd0 /mnt/vol01
```

## Use with platforms

- **Virtual machines**. Attach RBD images as VM disks.
- **Kubernetes**. Use the [Ceph CSI](https://github.com/ceph/ceph-csi) driver to provision RBD
  persistent volumes dynamically.
- **Databases**. Back high-I/O databases with an NVMe pool. See
  [Performance & Tiering](./performance-tiering).

| Resource                 | URL                                  |
| ------------------------ | ------------------------------------ |
| Ceph RBD (Block Storage) | https://docs.ceph.com/en/latest/rbd/ |
| Ceph CSI                 | https://github.com/ceph/ceph-csi     |

:::tip

You mirror RBD images to another cluster for disaster recovery. See
[Replication & DR](./replication-dr).

:::
