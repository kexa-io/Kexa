FROM oven/bun AS build

WORKDIR /app

COPY bun.lock .
COPY package.json .

RUN bun install --frozen-lockfile

COPY Kexa ./Kexa

# compile everything to a binary called cli which includes the bun runtime
RUN bun build ./Kexa/index.ts --compile --outfile cli

FROM ubuntu:22.04 # use a smaller image without bun

WORKDIR /app

# copy the compiled binary from the build image
COPY --from=build /app/cli /app/cli

# execute the binary!
CMD ["/app/cli"]
