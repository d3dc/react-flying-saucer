process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const path = require('path')
const { bundle } = require('../lib/rollup')

/*
 * Add another craco script using its internals
 * These might change in future releases
 */
const { log } = require('@craco/craco/lib/logger')
const {
  craPaths,
  loadWebpackProdConfig,
  overrideWebpackProdConfig,
} = require('@craco/craco/lib/cra')
const { loadCracoConfig } = require('@craco/craco/lib/config')
const { overrideWebpack } = require('@craco/craco/lib/features/webpack')

log('Override started with arguments: ', process.argv)
log('For environment: ', process.env.NODE_ENV)

const context = {
  env: process.env.NODE_ENV,
  paths: craPaths,
}

const package = require(craPaths.appPackageJson)

const cracoConfig = loadCracoConfig(context)
const craWebpackConfig = loadWebpackProdConfig()

// Instead of require.resolve hacking, run rollup
overrideWebpack(cracoConfig, craWebpackConfig, bundle(package.name), context)
