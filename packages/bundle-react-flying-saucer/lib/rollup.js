const del = require('del')
const path = require('path')
const rollup = require('rollup')
const { last, omit } = require('lodash')
const { log } = require('@craco/craco/lib/logger')
const { getLoader, loaderByName } = require('@craco/craco')

const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const rebase = require('rollup-plugin-rebase')
const resolve = require('rollup-plugin-node-resolve')

function externalBabelHelpers() {
  // Transforms any absolute references to node_modules into standard
  // require statements
  return {
    name: 'external-babel-helpers',
    resolveId(importee) {
      if (/node_modules/.test(importee)) {
        return last(importee.split(/node_modules\//))
      }
      return null
    },
  }
}

// dist is not ignored by SCM
function getEsmOutputOptions() {
  return {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  }
}

function getUmdOutputOptions(name) {
  return {
    name,
    file: 'dist/index.umd.js',
    format: 'umd',
    sourcemap: true,
  }
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

function getInputOptions(babelOptions, aliases = {}) {
  const extensions = ['.mjs', '.js', '.jsx', '.json']
  return {
    input: 'src/index.js',
    onwarn: (warning, next) => {
      // Ignore warnings in UMD about unnamed stylesheets
      // and node_modules
      if (warning.code === 'MISSING_GLOBAL_NAME') return
      next(warning)
    },
    external: function(importee) {
      // real paths: /<module>, ./<module>, ../<module>
      // and aliases: @@, @/<module>
      const localImport = /^([.@]*\/|@@)/.test(importee)

      return !localImport
    },
    plugins: [
      externalBabelHelpers(),
      alias({
        resolve: ['/index.js', ...extensions],
        ...aliases,
      }),
      rebase(),
      resolve({
        extensions,
      }),
      babel({
        ...babelOptions,
        comments: false,
        runtimeHelpers: true,
      }),
    ],
  }
}

function bundle(name) {
  return async configProvider => {
    const aliases = configProvider.resolve.alias
    const babelOptions = getBabelLoaderOptions(configProvider)
    const inputOptions = getInputOptions(babelOptions, aliases)

    const bundle = await rollup.rollup(inputOptions)

    log(`Bundling with dependencies:`)
    log(bundle.watchFiles) // an array of file names this bundle depends on

    await del('dist/*')
    await bundle.write(getEsmOutputOptions())
    await bundle.write(getUmdOutputOptions(name))
  }
}

module.exports = {
  bundle,
}
