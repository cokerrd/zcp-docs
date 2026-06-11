---
title: File Storage (CephFS)
sidebar_position: 3
---

CephFS is a POSIX-compliant shared filesystem backed by your cluster. Many clients mount the same
filesystem at once, which suits shared home directories, build artifacts, media pipelines, and HPC
scratch space.

## Mounting

Mount CephFS with the kernel client or via FUSE. With the kernel client:

```bash
mount -t ceph <mon-host>:6789:/ /mnt/cephfs \
  -o name=<client>,secret=<key>
```

The monitor host, client name, and key come from your
[credentials document](/cloud-storage/getting-started/provisioning#what-you-receive). For
Kubernetes, the [Ceph CSI](https://github.com/ceph/ceph-csi) driver provisions CephFS volumes
dynamically.

## When to choose CephFS

- Many clients need shared, concurrent read/write access to the same files.
- You need POSIX semantics (directories, permissions) rather than object or block.
- Workloads such as HPC scratch, CI and build caches, or shared datasets.

| Resource | URL                                     |
| -------- | --------------------------------------- |
| CephFS   | https://docs.ceph.com/en/latest/cephfs/ |
| Ceph CSI | https://github.com/ceph/ceph-csi        |
