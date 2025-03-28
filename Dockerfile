FROM oven/bun:latest as bun

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy application files
COPY . .

# Remove dev dependencies to reduce image size
RUN bun install --production --frozen-lockfile

# Run the app
USER bun
ENTRYPOINT [ "bun", "run", "Kexa/index.ts" ]
