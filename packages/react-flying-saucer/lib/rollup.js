const path = require('path')
const rollup = require('rollup')
const { omit } = require('lodash')
const { log } = require('@craco/craco/lib/logger')
const { getLoader, loaderByName } = require('@craco/craco')

const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const rebase = require('rollup-plugin-rebase')
const del = require('rollup-plugin-delete')
const resolve = require('rollup-plugin-node-resolve')

const { webpack } = require('../craco-config')

// dist is not ignored by SCM
const outputOptions = {
  dir: 'dist',
  format: 'esm',
  sourcemap: true,
}

function getBabelLoaderOptions(configProvider) {
  const { isFound, match } = getLoader(
    configProvider,
    loaderByName('babel-loader')
  )

  if (!isFound) {
    throw new Error(
      "craco: 'configProvider' does not contain a `babel-loader` configuration."
    )
  }

  // remove webpack only config
  const options = omit(match.loader.options, [
    'customize',
    'cacheDirectory',
    'cacheCompression',
    'cacheIdentifier',
  ])

  return options
}

function getInputOptions(babelOptions) {
  const extensions = ['.mjs', '.js', '.jsx', '.json']
  return {
    preserveModules: true,
    input: 'src/index.js',
    external: function(importee) {
      // external if it doesn't start
      // with a relative or absolute path
      // assumes no one else can touch webpack.alias
      return !/^([\.@]?\/|@@)/.test(importee)
    },
    plugins: [
      del({ targets: 'dist/*' }),
      alias({
        resolve: ['/index.js', ...extensions],
        ...webpack.alias,
      }),
      rebase(),
      resolve(extensions),
      babel({
        ...babelOptions,
        comments: false,
        runtimeHelpers: true,
      }),
    ],
  }
}

async function bundle(configProvider) {
  const babelOptions = getBabelLoaderOptions(configProvider)
  const inputOptions = getInputOptions(babelOptions)

  const bundle = await rollup.rollup(inputOptions)

  log(`Bundling with dependencies:`)
  log(bundle.watchFiles) // an array of file names this bundle depends on

  await bundle.write(outputOptions)
}

module.exports = {
  bundle,
}
