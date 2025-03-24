FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev /temp/prod
COPY package.json bun.lockb /temp/dev/
WORKDIR /temp/dev
RUN bun install --frozen-lockfile
COPY package.json bun.lockb /temp/prod/
WORKDIR /temp/prod
RUN bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] eslint (can also add test)
ENV NODE_ENV=production
RUN bun run lint

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src/ src/
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
#EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]