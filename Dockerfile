# syntax=docker/dockerfile:1
FROM oven/bun:slim AS bun-source

# Compression
FROM alpine:3.21 AS compress
RUN apk add upx
COPY --from=bun-source /usr/local/bin/bun /usr/local/bin/
WORKDIR /usr/local/bin
RUN upx bun

# Build
FROM frolvlad/alpine-glibc AS build
WORKDIR /usr/src/app

COPY --from=compress /usr/local/bin/bun /usr/local/bin/

COPY package.json bun.lock ./
COPY README.md ./
COPY capacity.json ./
COPY VERSION ./

RUN bun install --production

COPY Kexa ./Kexa
COPY rules ./rules
COPY config/default.json ./config/

# Final image
FROM frolvlad/alpine-glibc

RUN apk add --no-cache libgcc

COPY --from=compress /usr/local/bin/bun /usr/local/bin/

WORKDIR /app

COPY --from=build /usr/src/app /app

RUN mkdir -p output && touch config/headers.json

ENV NODE_ENV=production

CMD [ "bun", "run", "Kexa/index.ts" ]