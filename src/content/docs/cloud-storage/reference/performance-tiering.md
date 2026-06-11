---
title: Performance & Tiering
sidebar_position: 5
---

A dedicated cluster lets you match device classes and data-protection schemes to each workload,
rather than accept a one-size-fits-all tier.

## NVMe as a fast tier or cache

You use NVMe drives two ways:

- **As a dedicated fast pool**. Place latency-sensitive workloads (databases, metadata, hot buckets)
  on an all-NVMe pool, and bulk or cold data on high-capacity drives.
- **As a cache layer for spinning disks**. Front high-capacity HDDs with NVMe so frequently accessed
  data is served from flash.

A modest amount of NVMe paired with high-capacity drives delivers strong performance per GB stored,
without paying for all-flash capacity.

## Replication vs erasure coding

Per pool, pick the data-protection scheme for the workload:

- **Replication** (for example 3x). Lowest latency and simplest recovery. Higher raw-capacity
  overhead.
- **Erasure coding**. Much better usable-to-raw capacity ratio. Best for large, throughput-oriented
  or archival data.

Mixing schemes across pools in the same cluster lets you tune cost and performance per workload.

| Resource               | URL                                                            |
| ---------------------- | -------------------------------------------------------------- |
| Ceph pools             | https://docs.ceph.com/en/latest/rados/operations/pools/        |
| CRUSH / device classes | https://docs.ceph.com/en/latest/rados/operations/crush-map/    |
| Erasure coding         | https://docs.ceph.com/en/latest/rados/operations/erasure-code/ |

:::tip

Not sure how to lay out pools and device classes for your workload? ZSoftly designs the layout with
you during [provisioning](/cloud-storage/getting-started/provisioning#sizing-inputs).

:::
