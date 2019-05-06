#!/usr/bin/env node
const path = require('path')
const configPath = path.relative(
  process.cwd(),
  require.resolve('craco-flying-saucer')
)

// Are we running bundle or watch?
const useRollupWatch = process.argv.find(arg => arg === '--watch')

process.env.NODE_ENV = 'production'
// craco `craPaths` inspects these
process.argv = ['--config', configPath]

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

/*
 * Add another craco script using its internals
 * These might change in future releases
 */
const { log } = require('@craco/craco/lib/logger')
const { getCraPaths, loadWebpackProdConfig } = require('@craco/craco/lib/cra')
const { loadCracoConfig } = require('@craco/craco/lib/config')
const { overrideWebpack } = require('@craco/craco/lib/features/webpack')
const { bundle, watch } = require('../lib/rollup')

log('Bundling started with arguments: ', process.argv)
log('For environment: ', process.env.NODE_ENV)

const context = {
  env: process.env.NODE_ENV,
}

const cracoConfig = loadCracoConfig(context)
const craWebpackConfig = loadWebpackProdConfig(cracoConfig)

context.paths = getCraPaths(cracoConfig)

const package = require(context.paths.appPackageJson)

// Instead of require.resolve hacking, run rollup
overrideWebpack(
  cracoConfig,
  craWebpackConfig,
  useRollupWatch ? watch(package.name) : bundle(package.name),
  context
)
