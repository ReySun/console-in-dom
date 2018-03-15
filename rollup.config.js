export default [
  {
    input: './dist/es2015/index.js',
    output: {
      file: './dist/global/console.js',
      format: 'umd',
      sourcemap: true,
      name: "ConsoleInDom"
    }
  }
];