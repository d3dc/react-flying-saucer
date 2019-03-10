const nodeExternals = require('webpack-node-externals')
const { castArray, includes, remove, replace } = require('lodash')
const { log } = require('@craco/craco/lib/logger')
const { getLoaders, loaderByName } = require('@craco/craco')
// const paths = require('react-scripts/config/paths')

const cssPlugin = 'MiniCssExtractPlugin'

const htmlPlugins = [
  'HtmlWebpackPlugin',
  'InlineChunkHtmlPlugin',
  'InterpolateHtmlPlugin',
]

const isForHtml = plugin => includes(htmlPlugins, plugin.constructor.name)
const isCssPlugin = plugin => plugin.constructor.name === cssPlugin

function customizeCssOutput(webpackConfig) {
  const cssPlugin = webpackConfig.plugins.find(isCssPlugin)

  Object.assign(cssPlugin.options, {
    filename: '[name].css',
    chunkFilename: '[name].chunk.css',
  })
}

function customizeJsOutput(webpackConfig) {
  // libraryTarget 'module' won't be supported until webpack 5
  // currently, there's no way to get a tree-shakable bundle
  // const package = require(paths.appPackageJson)

  remove(webpackConfig.plugins, isForHtml)

  Object.assign(webpackConfig.output, {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // library: package.name,
    // libraryTarget: 'module',
  })
}

function customizeExternals(webpackConfig) {
  const externals = [nodeExternals()]
  webpackConfig.externals
    ? (webpackConfig.externals = [...webpackConfig.externals, ...externals])
    : (webpackConfig.externals = externals)
}

module.exports = {
  overrideWebpackConfig({ webpackConfig }) {
    customizeCssOutput(webpackConfig)
    customizeJsOutput(webpackConfig)
    customizeExternals(webpackConfig)

    return webpackConfig
  },
}
