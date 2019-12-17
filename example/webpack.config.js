const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情

module.exports = {
  mode: 'development',
  // production devtool: 'cheap-module-source-map',
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'none',
  entry: {
    main: './src/index.js',
    // sub: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true // 为true代表hot失效时，不做任何处理
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader', // 文件转换
          loader: 'url-loader', // 可以转换成base64
          options: {
            // placeholder 占位符
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 1024 * 10 // 小于10k编译成base64
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ] // loader执行顺序：从下到上，从右到左
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ] // loader执行顺序：从下到上，从右到左
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader', // 文件转换
          options: {
            outputPath: 'font/'
          }
        },
      },
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin() // 热替换模式
  ],
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
};