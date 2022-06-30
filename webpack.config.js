var webpack = require('webpack');
var path = require('path');
const GlobEntries = require('webpack-glob-entries');

module.exports = {
  mode: 'production',
  entry: GlobEntries('./src/tests/**/*test*.js'), // Generates multiple entry for each test
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, 'src/core/'),
      data: path.resolve(__dirname, 'src/data/'),
      tests: path.resolve(__dirname, 'src/tests/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
  target: 'web',
  externals: /k6(\/.*)?/,
  devtool: 'source-map',
};
