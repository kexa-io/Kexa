FROM node:20-slim@sha256:df85129996d6b7a4ec702ebf2142cfa683f28b1d33446faec12168d122d3410d AS base

#RUN apk update && apk add -u nodejs
RUN apt-get update && apt-get install -y curl

RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

RUN helm version

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS build
ENV NODE_OPTIONS=--max-old-space-size=16384
RUN pnpm run build

FROM base AS release
COPY --from=build /app/build /app/build

EXPOSE 8000
CMD ["/app/dockerstart.sh"]