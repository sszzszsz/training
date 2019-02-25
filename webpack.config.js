// import modules
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "./src/practice/webpack/index.js"),
  output: {
    path: path.resolve(__dirname, './htdocs/practice/webpack/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};