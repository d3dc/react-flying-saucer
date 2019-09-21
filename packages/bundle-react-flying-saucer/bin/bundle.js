#!/usr/bin/env node
productionEnv()
require('craco-flying-saucer/bootstrap')

const [webpackConfig, context] = getOverriddenWebpackConfig()
const package = require(context.paths.appPackageJson)

bundleTask(package.name, webpackConfig)

/**
 * hoisted functions
 * note: in addition to grouping requires
 * this also prevents craco from setting up
 * too early
 * */

function bundleTask(bundleName, webpackConfig) {
  const { bundle, watch } = require('../lib/rollup')
  const useRollupWatch = process.argv.find(arg => arg === '--watch')

  // Are we running bundle or watch?
  const task = useRollupWatch ? watch : bundle

  return task(bundleName, webpackConfig)
}

function productionEnv() {
  process.env.NODE_ENV = 'production'

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', err => {
    throw err
  })
}

function getOverriddenWebpackConfig() {
  /*
   * Add another craco script using its internals
   * These might change in future releases
   */
  const { log } = require('@craco/craco/lib/logger')
  const { loadCracoConfig } = require('@craco/craco/lib/config')
  const { getCraPaths, loadWebpackProdConfig } = require('@craco/craco/lib/cra')
  const {
    mergeWebpackConfig,
  } = require('@craco/craco/lib/features/webpack/merge-webpack-config')

  log('Bundling started with arguments: ', process.argv)
  log('For environment: ', process.env.NODE_ENV)

  const context = {
    env: process.env.NODE_ENV,
  }

  const cracoConfig = loadCracoConfig(context)
  const craWebpackConfig = loadWebpackProdConfig(cracoConfig)

  context.paths = getCraPaths(cracoConfig)

  const resultingWebpackConfig = mergeWebpackConfig(
    cracoConfig,
    craWebpackConfig,
    context
  )

  return [resultingWebpackConfig, context]
}
