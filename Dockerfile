FROM node:22-bookworm-slim AS builder

WORKDIR /app
RUN corepack enable pnpm

COPY pnpm-lock.yaml package.json ./
# Install deps, then assert Sharp's native binary is loadable. pnpm 10 skips
# Sharp's build script ("Ignored build scripts: sharp"), so the build depends on
# the platform-specific @img/sharp-* optional dep being installed. Astro's image
# optimization loads Sharp the same way (require('sharp')) and aborts the whole
# build with "MissingSharp" if it isn't there. Folding the check into this RUN
# keeps it in the install layer and surfaces a missing/stale binary here, with a
# clear message, instead of 40s later mid-build.
RUN pnpm install --frozen-lockfile && node -e "require('sharp')"

# Chromium for Playwright — rehype-mermaid renders Mermaid diagrams to static
# SVG at build time. Debian base (not Alpine) is required because Playwright's
# Chromium needs glibc. This builder stage is discarded; the runtime image below
# stays caddy:2-alpine.
RUN pnpm exec playwright install --with-deps chromium

COPY . .

# Non-prod host for Docker (dev/stg) builds; prod is built by the iaas play
# without this arg and falls back to the canonical host in astro.config.mjs.
ARG PUBLIC_SITE_URL=https://dev-docs.apps.zcp.zsoftly.ca
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN pnpm build

FROM caddy:2-alpine

# Labels apply to the final runtime image (a builder-stage LABEL is discarded).
LABEL org.opencontainers.image.source=https://github.com/zsoftly/zcp-docs
LABEL org.opencontainers.image.description="ZSoftly Documentation"

# Patch Alpine OS packages — clears OS-level CVEs in the shipped runtime image
RUN apk upgrade --no-cache

ARG CADDYFILE=dev.Caddyfile
COPY deploy/caddy/${CADDYFILE} /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv

ENV SITE_DOMAIN=:80
ENV SITE_ROOT=/srv

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:80/ || exit 1
