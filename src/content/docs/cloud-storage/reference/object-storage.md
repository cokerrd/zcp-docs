---
title: Object Storage (S3)
sidebar_position: 1
---

# Object Storage (S3)

Your cluster provides S3-compatible object storage through the Ceph RADOS Gateway (RGW). It mimics
the Amazon S3 API, so existing S3 tools and SDKs work against your cluster once you change the
endpoint URL.

## Endpoint and credentials

From your [credentials document](../getting-started/provisioning#what-you-receive):

- **S3 Endpoint URL**, for example `https://<rgw-endpoint>`
- **Access Key ID** and **Secret Access Key**

Create more RGW users and keys from the Ceph Dashboard or with the `radosgw-admin` tooling on your
cluster.

## Clients

**AWS CLI**

```bash
aws configure                 # enter your access key + secret
aws s3 mb s3://my-bucket --endpoint-url https://<rgw-endpoint>
aws s3 cp ./file.dat s3://my-bucket/ --endpoint-url https://<rgw-endpoint>
aws s3 ls s3://my-bucket --endpoint-url https://<rgw-endpoint>
```

**rclone**

```bash
rclone config   # provider: S3 (Other / Ceph), set endpoint + keys
rclone copy ./data zcs:my-bucket
```

**Python (boto3)**

```python
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://<rgw-endpoint>",
    aws_access_key_id="<access-key>",
    aws_secret_access_key="<secret-key>",
)
s3.create_bucket(Bucket="my-bucket")
```

## Supported features

Ceph RGW supports common S3 operations: multipart uploads, object versioning, bucket policies, and
presigned URLs. For the full, version-specific feature set, see the upstream documentation.

| Resource             | URL                                         |
| -------------------- | ------------------------------------------- |
| Ceph RGW (Object/S3) | https://docs.ceph.com/en/latest/radosgw/    |
| RGW S3 API support   | https://docs.ceph.com/en/latest/radosgw/s3/ |

:::tip

To replicate object data across sites, use RGW multisite. See [Replication & DR](./replication-dr).

:::
