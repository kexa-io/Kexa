FROM oven/bun:latest as bun

FROM alpine:3.18 as alpine
RUN apk add upx
COPY --from=bun /usr/local/bin/bun /usr/local/bin/
WORKDIR /usr/local/bin
# Compress bun binary
RUN upx --all-methods --no-lzma bun

FROM frolvlad/alpine-glibc
COPY --from=alpine /usr/local/bin/bun /usr/local/bin/

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy application files
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Remove dev dependencies to reduce image size
RUN bun install --production --frozen-lockfile

# Run the app
USER bun
ENTRYPOINT [ "bun", "run", "Kexa/index.ts" ]
