const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')

const makeHtmlOptions = options => {
  const { identity, ...overrides } = options

  return {
    inject: false,
    template: htmlWebpackTemplate,
    filename: `${identity}.html`,
    chunks: [identity],
    meta: {
      viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
    },
    lang: 'vi-VN',
    appMountId: 'app',
    ...overrides,
  }
}

module.exports = {
  entry: {
    index: './index.js',
    options: './options.js',
    background: './background.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      makeHtmlOptions({
        identity: 'index',
        title: 'Home',
      })
    ),
    new HtmlWebpackPlugin(
      makeHtmlOptions({
        identity: 'options',
        title: 'Configure',
      })
    ),
    new CopyPlugin(['manifest.json', { from: 'assets', to: 'assets' }]),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
