---
title: Detach or Delete Blocked by a Snapshot Error
description:
  Detaching a volume or deleting an instance fails with a snapshot error, but no snapshots are
  listed. Raise a support ticket to resolve it.
---

## Symptom

One or both of the following operations fail repeatedly:

- Detaching a block storage volume from an instance.
- Deleting an instance.

The portal shows a **Detach Disk** error notification with the message:

```text
Unable to detach volume, please specify an Instance that does not have Instance Snapshots
```

When you open the instance and check the **Instance Snapshots** tab, the list is empty. There is
nothing to delete. The operation remains blocked regardless.

## Cause

This happens when an earlier instance snapshot attempt failed partway through. A failed attempt
leaves behind an internal snapshot record in an error state. The portal hides failed snapshots, so
the list looks empty. The platform still counts the record and blocks the operation until our team
clears it.

This is a rare platform-side condition. There is no way to clear it from the portal, the CLI, or the
API.

## Resolution

Raise a support ticket so our engineering team removes the failed snapshot record. This is a quick,
safe fix and does not affect your data or other resources.

Include the following in the ticket:

1. The instance name.
2. The volume name, if a detach is failing.
3. The region the instance is in.
4. The exact error message.
5. The approximate date and time you last tried to create a snapshot of the instance, if known.

After our team clears the record, detach and delete work normally.

:::tip

If creating an instance snapshot ever fails, raise a ticket at that point with the instance name and
the time of the failure. That clears the condition early, before it blocks a detach or delete later.

:::

See also: [VM Snapshots](/public-cloud/backups-snapshots/vm-snapshots),
[Block Storage](/public-cloud/compute/settings/block-storage)
