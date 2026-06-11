---
title: Ceph Versions
sidebar_position: 6
---

## Provisioned version

Your cluster runs a recent stable Ceph release by default. Need a specific version, to match an
existing cluster you replicate with or to align with a tool's supported range? Select it with the
ZSoftly team during [provisioning](/cloud-storage/getting-started/provisioning#sizing-inputs).

Your [credentials document](/cloud-storage/getting-started/provisioning#what-you-receive) records
the exact version deployed. Confirm it on the cluster:

```bash
ceph versions
```

## Upgrades

The cluster is single-tenant and yours to administer, so version upgrades happen around your
maintenance windows. ZSoftly support helps you plan and review an upgrade path.

| Resource         | URL                                              |
| ---------------- | ------------------------------------------------ |
| Ceph releases    | https://docs.ceph.com/en/latest/releases/        |
| Upgrade guidance | https://docs.ceph.com/en/latest/cephadm/upgrade/ |
