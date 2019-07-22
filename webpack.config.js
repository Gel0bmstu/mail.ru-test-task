const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Ts build
module.exports = {
  entry: [
    './src/ts/index.ts',
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'src/js/'),
    filename: 'bundle.js'
  },
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      },
    ]
  },
  mode: 'production',
};

// Scss build
// module.exports = {

//   mode: 'production',
// };