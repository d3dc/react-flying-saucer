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

function getBabelLoaderOptions(webpackConfig, useESModules = true) {
  const { isFound, match } = getLoader(
    webpackConfig,
    loaderByName('babel-loader')
  )

  if (!isFound) {
    throw new Error(
      "craco: 'webpackConfig' does not contain a `babel-loader` configuration."
    )
  }

  // remove webpack only config
  const options = omit(match.loader.options, [
    'customize',
    'cacheDirectory',
    'cacheCompression',
    'cacheIdentifier',
  ])

  const craPresetIndex = options.presets.findIndex(
    loaderByName('babel-preset-react-app')
  )

  if (craPresetIndex > -1) {
    options.presets = options.presets.map((existing, index) =>
      index === craPresetIndex
        ? [
            existing,
            {
              useESModules,
              absoluteRuntime: false,
            },
          ]
        : existing
    )
  }

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
  return async (cracoConfig, webpackConfig, context) => {
    const aliases = webpackConfig.resolve.alias

    const esmBundle = await rollup.rollup(
      getInputOptions(getBabelLoaderOptions(webpackConfig), aliases)
    )

    log(`Bundling ESM with dependencies:`)
    log(esmBundle.watchFiles) // an array of file names this bundle depends on

    const umdBundle = await rollup.rollup(
      getInputOptions(getBabelLoaderOptions(webpackConfig, false), aliases)
    )

    log(`Bundling UMD with dependencies:`)
    log(umdBundle.watchFiles) // an array of file names this bundle depends on

    await del('dist/*')
    await esmBundle.write(getEsmOutputOptions())
    await umdBundle.write(getUmdOutputOptions(name))
  }
}

function watch(name) {
  return async (cracoConfig, webpackConfig, context) => {
    const aliases = webpackConfig.resolve.alias

    await del('dist/*')

    const esmWatcher = rollup.watch({
      ...getInputOptions(getBabelLoaderOptions(webpackConfig), aliases),
      output: getEsmOutputOptions(),
    })

    const umdWatcher = rollup.watch({
      ...getInputOptions(getBabelLoaderOptions(webpackConfig, false), aliases),
      output: getUmdOutputOptions(),
    })

    for (const watcher of [esmWatcher, umdWatcher]) {
      watcher.on('event', event => {
        switch (event.code) {
          case 'START':
            return console.log('the watcher is (re)starting')
          case 'BUNDLE_START':
            return console.log('building an individual bundle')
          case 'BUNDLE_END':
            return console.log('finished building a bundle')
          case 'END':
            return console.log('finished building all bundles')
          case 'ERROR':
            return console.log('encountered an error while bundling')
          case 'FATAL':
            return console.log('encountered an unrecoverable error')
        }
      })
    }
  }
}

module.exports = {
  bundle,
  watch,
}
