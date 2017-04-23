java -jar "$CC_PATH" --externs=externs.js --js=app.js --language_in=ECMASCRIPT6 --language_out=ECMASCRIPT5 --compilation_level ADVANCED_OPTIMIZATIONS --rewrite_polyfills=false > cc.js
