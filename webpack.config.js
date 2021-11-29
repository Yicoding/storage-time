const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'webpack-output')
  },
  // module: {
  //   rules: [
  //     {
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env'],
  //         },
  //       }
  //     }
  //   ]
  // },
}