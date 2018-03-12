const fs = require('fs-extra');
fs.ensureDir('./dist/package')
var PKG = require('./package.json');
delete PKG.scripts;
delete PKG.devDependencies;
var package = Object.assign({}, PKG, {
  main: "./cjs/console.js",
  typings: "./typings/console.d.ts"
})

fs.copySync('./dist/global', './dist/package');
fs.copyFileSync('./dist/demo/console.css', './dist/package/console.css');
fs.copyFileSync('./README.md', './dist/package/README.md');
fs.writeJsonSync('./dist/package/package.json', package);
fs.copySync('./dist/typings', './dist/package/typings');
fs.copySync('./dist/cjs', './dist/package/cjs');
fs.copySync('./dist/es2015', './dist/package/es2015');