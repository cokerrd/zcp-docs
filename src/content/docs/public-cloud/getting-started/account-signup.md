---
sidebar_position: 2
title: Account Signup
---

## ZSoftly Public Cloud Account Setup Guide

This guide provides a step-by-step tutorial to help you create a ZSoftly Public Cloud account, set
up billing, and verify your account.

### Account and Project Structure

**One email address, one account.** Each email address maps to exactly one ZCP account. You cannot
register a second account with an address already in use.

**Use Projects for environment isolation.** Most teams need one account. Create separate
**Projects** inside it for `dev`, `stg`, and `prd`. Each Project gets its own resources, quotas, and
team membership. Resources in different Projects do not share networks or storage. See
[Projects](../projects) for details.

**Use separate accounts for hard isolation.** Some organizations need a complete boundary between
environments or business units: separate billing, separate IAM, and no shared resources. Create one
account per boundary. Because each account requires a unique email address, use plus-addressing if
your mail provider supports it:

| Account   | Email                   |
| --------- | ----------------------- |
| Account 1 | `company+1@example.com` |
| Account 2 | `company+2@example.com` |
| Account 3 | `company+3@example.com` |

All three addresses deliver to the same inbox. Each maps to a fully independent ZCP account with its
own billing and IAM.

### Register Account

- Visit the ZSoftly Public Cloud website and navigate to the **Sign-In** or **Create Account**
  section.
- Enter the necessary details, such as your name, email address, and password.
- Click **Register** to proceed to the next step.

:::note

Screenshots coming.

:::

### Verify Your Email

- Check your email inbox for a verification email from ZSoftly Public Cloud containing a One-Time
  Password (OTP).
- Enter the **OTP** in the provided field on the website.
- Click **Verify** to confirm and proceed to the billing setup.

:::note

Screenshots coming.

:::

### Set Up Billing Method

- After verifying your account, you'll be prompted to set up your billing information.
- Choose a billing type:
  - **Individual**: For personal use; enter details like your address.
  - **Company**: For organizational use; provide details such as your company name, website, and
    address.

- If you have a coupon, redeem it at checkout to receive a discount or promotional offer.

:::note

Screenshots coming.

:::

### Choose a Payment Plan

#### Prepaid (Recommended):

- Prepaid accounts require you to load credits in advance, which you'll use to create resources
  within the platform.
- To use resources, purchase infrastructure credits by selecting the desired amount.
- Choose a payment method (e.g., Stripe, PayPal, Razorpay) and click **Proceed** to complete the
  payment.

#### Postpaid:

- Postpaid accounts allow you to pay after consuming resources. This option requires additional
  verification, such as detailed billing information or credit checks.
- Choose a payment method (e.g., Stripe, PayPal, Razorpay, Manual) and click **Save Card** to
  complete the payment.

:::note

Screenshots coming.

:::

### Final Steps

- Review the **Terms & Conditions** of the platform carefully.
- Accept the terms to complete the registration process.

- **Prepaid Users**: Your account status will display as active, with the account type set to
  prepaid.

- **Postpaid Users**: After verification, your account will display as active with the account type
  set to postpaid.

Setting up your ZSoftly Public Cloud account is a straightforward process. Register, verify your
email, configure billing, and choose a payment plan that best suits your needs. Once completed,
you'll have full access to the ZSoftly Public Cloud dashboard and its features, enabling you to
manage your resources efficiently.
