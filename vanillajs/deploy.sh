CC_PATH="node_modules/google-closure-compiler/compiler.jar"

cp app/app.js app/tmp.js

java -jar "$CC_PATH" --externs=app/externs.js --js=app/tmp.js --language_in=ECMASCRIPT6 --language_out=ECMASCRIPT5 --compilation_level ADVANCED_OPTIMIZATIONS --rewrite_polyfills=false > app/app.js

yarn run deploy-now
