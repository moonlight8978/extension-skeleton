const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    links: ['https://fonts.googleapis.com/css?family=Roboto&display=swap'],
    lang: 'vi-VN',
    appMountId: 'app',
    ...overrides,
  }
}

module.exports = webpackEnv => {
  const isEnvProduction = webpackEnv === 'production'
  const isEnvDevelopment = webpackEnv === 'development'

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
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
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false,
      }),
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
          loader: 'babel-loader',
        },
        {
          test: /(?<!\.module)\.s?css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: isEnvDevelopment } },
            {
              loader: 'sass-loader',
              options: { sourceMap: isEnvDevelopment },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.module.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]_[local]--[hash:base64:5]',
                  context: path.resolve(__dirname, 'src'),
                },
                sourceMap: isEnvDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isEnvDevelopment },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
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
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
  }
}
