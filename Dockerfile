#FROM node:18-alpine
#
#WORKDIR /app
#
#COPY . .
#
#RUN npm ci
#
#RUN npm run build
#
#CMD ["node", "build/index.js"]
#CMD ["sleep","infinity"]

FROM node:20-slim AS base
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
#CMD ["sleep","infinity"]
CMD [ "pnpm", "run", "start:nobuild" ]