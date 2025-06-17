build-cli: kexa-cli
 echo "building cli."
 bun build Kexa/main.ts --compile  --minify --sourcemap --outfile=./kexa-cli

clean:
 rm *.bun-build