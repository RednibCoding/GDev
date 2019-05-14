
@echo off
echo[
echo compile typescript
@call tsc
echo compress javascript
@call uglifyjs js/jbb.js -o js/jbb.min.js --source-map
echo create documentation
@call typedoc --out docs/ typescript/