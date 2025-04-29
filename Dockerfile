FROM oven/bun:slim as bun-source

# Compression
FROM alpine:3.18 as compress
RUN apk add upx
COPY --from=bun-source /usr/local/bin/bun /usr/local/bin/
WORKDIR /usr/local/bin
RUN upx bun

# Build
FROM frolvlad/alpine-glibc as build
WORKDIR /usr/src/app

COPY --from=compress /usr/local/bin/bun /usr/local/bin/

COPY package.json bun.lock ./
COPY README.md ./
COPY capacity.json ./
COPY VERSION ./

RUN bun install --production --frozen-lockfile

COPY Kexa ./Kexa

# Final image
FROM frolvlad/alpine-glibc

RUN apk add --no-cache libgcc

COPY --from=compress /usr/local/bin/bun /usr/local/bin/

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

ENV NODE_ENV=production

CMD [ "bun", "run", "Kexa/index.ts" ]