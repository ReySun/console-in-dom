var compiler = require('google-closure-compiler-js').compile;
var fs = require('fs');

var source = fs.readFileSync('dist/global/console.js', 'utf8');

var compilerFlags = {
  jsCode: [{src: source}],
  languageIn: 'ES2015',
  createSourceMap: true,
};

var output = compiler(compilerFlags);

fs.writeFileSync('dist/global/console.min.js', output.compiledCode, 'utf8');
fs.writeFileSync('dist/global/console.min.js.map', output.sourceMap, 'utf8');