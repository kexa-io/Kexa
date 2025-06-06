#!/bin/sh

cp -r /rules/* /app/rules/
cp -r /config/* /app/config/

pwd
ls -l /app/config/
cat /app/config/*

bun run Kexa/main.ts

EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  echo "bun run Kexa/main.ts failed with exit code $EXIT_CODE"
  exit $EXIT_CODE
fi