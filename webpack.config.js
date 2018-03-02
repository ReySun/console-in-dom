const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/demo.ts'),
  output: {
    filename: 'demo.bundle.js',
		path: path.join(__dirname, './dist/demo')
  },
  resolve:{
    extensions: [".js", ".ts", ".less"] // why i'm hava to use extensions '.js' ?
  },
  module: {
    rules:[
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    }),
    new ExtractTextPlugin('console.css')
  ],
  target: 'web',
  devServer: {
    contentBase: false,
    compress: true,
    port: 9000
  }
}