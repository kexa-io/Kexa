

FROM gcr.io/oss-fuzz-base/base-builder-javascript

COPY build.sh $SRC/index.js

RUN mkdir -p $SRC/index.js

COPY fuzzer.ts target.ts package.json tsconfig.json $SRC/example/

WORKDIR $SRC/