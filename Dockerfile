FROM node:22-slim@sha256:377674fd5bb6fc2a5a1ec4e0462c4bfd4cee1c51f705bbf4bda0ec2c9a73af72 AS base

#RUN apk update && apk add -u nodejs
RUN apt-get update && apt-get install -y curl

RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

RUN helm version

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN corepack prepare


COPY . /app
WORKDIR /app
RUN pnpm install

FROM base AS build
ENV NODE_OPTIONS=--max-old-space-size=16384
RUN pnpm run build

FROM base AS release
COPY --from=build /app/build /app/build

EXPOSE 8000
CMD ["/app/dockerstart.sh"]