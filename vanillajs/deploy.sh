set -e
set -o pipefail

CC_PATH="node_modules/google-closure-compiler/compiler.jar"

cp app/app.js app/tmp.js

echo "compiling code \o/"
java -jar "$CC_PATH" --externs=app/externs.js --js=app/tmp.js --language_in=ECMASCRIPT6 --language_out=ECMASCRIPT5 --compilation_level ADVANCED_OPTIMIZATIONS --rewrite_polyfills=false > app/app.js

echo "deploying"
yarn run deploy-now

echo "cleaning up"
git reset --hard
