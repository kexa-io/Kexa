# syntax=docker/dockerfile:1
# Stage 1: Get and compress Bun binary
FROM oven/bun:slim AS bun-source

FROM alpine:3.22 AS compress
RUN apk add --no-cache upx
COPY --from=bun-source /usr/local/bin/bun /usr/local/bin/
WORKDIR /usr/local/bin
RUN upx --best --lzma bun

# Stage 2: Install production dependencies
FROM frolvlad/alpine-glibc AS deps
WORKDIR /usr/src/app
COPY --from=compress /usr/local/bin/bun /usr/local/bin/
COPY package.json bun.lock ./
RUN bun install --production

# Reduce size of node_modules
RUN find node_modules -type f \
  \( -name '*.md' -o -name '*.ts' -o -name '*.map' \) \
  -delete

# Stage 3: Build final image
FROM frolvlad/alpine-glibc
RUN apk add --no-cache libgcc
COPY --from=compress /usr/local/bin/bun /usr/local/bin/

WORKDIR /app

# Copy only necessary production artifacts
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY Kexa ./Kexa
COPY README.md ./
COPY capacity.json ./
COPY VERSION ./

RUN mkdir -p rules output config && touch config/headers.json

ENV NODE_ENV=production

CMD ["bun", "run", "Kexa/main.ts"]
