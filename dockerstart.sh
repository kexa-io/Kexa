#!/bin/sh

cp -r /rules/* /app/rules/
cp -r /config/* /app/config/

pwd
ls -l /app/config/
cat /app/config/*

pnpm run start:nobuild

EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  echo "pnpm run start:nobuild failed with exit code $EXIT_CODE"
  exit $EXIT_CODE
fi