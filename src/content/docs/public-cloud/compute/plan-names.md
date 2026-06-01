---
title: Plan Names
sidebar_position: 8
description: How ZCP compute plan IDs encode processor, family, region, storage, and size.
---

Every compute plan has a short, structured ID such as `ca2.l` or `cam2.2xl`. Once you know the
pattern you can read a plan's processor, family, region, storage tier, and size straight from its
name — no lookup table required.

## Anatomy of a plan ID

A plan ID is a **series** followed by a `.` and a **size**:

```
ca2.l
│││ └── size
││└──── region  (1 = Ottawa · 2 = Montreal)
│└───── processor (i = Intel · a = AMD)
└────── c = compute
```

Memory- and CPU-optimized plans add a family letter, and the budget storage tier adds a trailing
`s`:

```
cam2.2xl        ca2s.s
│││││ └── size   ││││ └── size
││││└──── region │││└──── s = Premium SSD budget variant
│││└───── 2 YUL  ││└───── region (2 = Montreal)
││└────── m mem- │└────── processor (a = AMD)
││        optim. └─────── c = compute
│└─────── processor       (no family letter = general purpose)
└──────── c = compute
```

## Segments

| Position  | Values                                  | Meaning                                            |
| --------- | --------------------------------------- | -------------------------------------------------- |
| Prefix    | `c`                                     | Compute                                            |
| Processor | `i` / `a`                               | Intel / AMD                                        |
| Family    | _(none)_ / `m` / `c`                    | General purpose / Memory-optimized / CPU-optimized |
| Region    | `1` / `2`                               | Ottawa (YOW) / Montreal (YUL)                      |
| Variant   | _(none)_ / `s`                          | Standard NVMe / Premium SSD budget tier            |
| Size      | `xs` `s` `m` `l` `xl` `2xl` `4xl` `6xl` | Relative capacity, smallest to largest             |

## Plan series

| Series | Region         | Processor | Storage     | Family                   |
| ------ | -------------- | --------- | ----------- | ------------------------ |
| `ci1`  | Ottawa (YOW)   | Intel     | NVMe        | General purpose          |
| `ca1`  | Ottawa (YOW)   | AMD       | NVMe        | General purpose          |
| `ca2`  | Montreal (YUL) | AMD       | Pro NVMe    | General purpose          |
| `ca2s` | Montreal (YUL) | AMD       | Premium SSD | General purpose (budget) |
| `cim1` | Ottawa (YOW)   | Intel     | NVMe        | Memory-optimized         |
| `cam1` | Ottawa (YOW)   | AMD       | NVMe        | Memory-optimized         |
| `cam2` | Montreal (YUL) | AMD       | Pro NVMe    | Memory-optimized         |
| `cac1` | Ottawa (YOW)   | AMD       | NVMe        | CPU-optimized            |
| `cac2` | Montreal (YUL) | AMD       | Pro NVMe    | CPU-optimized            |

## vCPU-to-RAM ratios

The family determines how vCPU and RAM scale together:

| Family                      | Ratio (RAM:vCPU) | Notes                   |
| --------------------------- | ---------------- | ----------------------- |
| General purpose `xs`–`l`    | 2:1              |                         |
| General purpose `xl` and up | 4:1              | Capped at 16 vCPU       |
| Memory-optimized (`m`)      | 8:1              | For RAM-heavy workloads |
| CPU-optimized (`c`)         | 1:1              | High-density compute    |

:::tip

The full plan catalog, with vCPU, RAM, disk, and pricing for every size, is on the
[pricing page](https://zcp.zsoftly.ca/pricing).

:::
