---
title: Replication & DR
sidebar_position: 4
---

# Replication & Disaster Recovery

You have root-level control of the cluster, so you replicate data for disaster recovery between ZCS
clusters and any other Ceph cluster you administer.

## Replication options

- **Object (RGW multisite)**. Replicate buckets and objects between zones or clusters for an
  active-active or active-passive object store.
- **Block (RBD mirroring)**. Asynchronously mirror RBD images to a second cluster for block-level
  DR.

## Common topologies

- **Replicate in to ZCS**. Point an existing on-prem or third-party Ceph cluster at your ZCS cluster
  to use it as a recovery target.
- **Replicate out from ZCS**. Replicate your ZCS cluster to another ZSoftly region, to an on-prem
  cluster, or to any Ceph cluster you operate.

Both endpoints are standard Ceph, so replication is not tied to ZSoftly. You pair a ZCS cluster with
clusters you run anywhere.

| Resource      | URL                                                |
| ------------- | -------------------------------------------------- |
| RGW Multisite | https://docs.ceph.com/en/latest/radosgw/multisite/ |
| RBD Mirroring | https://docs.ceph.com/en/latest/rbd/rbd-mirroring/ |

:::note

Review DR designs with ZSoftly support: which pools, sync direction, and recovery objectives. That
way the topology matches your recovery targets.

:::
