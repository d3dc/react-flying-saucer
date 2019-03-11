const path = require('path')
const rollup = require('rollup')
const { log } = require('@craco/craco/lib/logger')
const { getLoader, loaderByName } = require('@craco/craco')

const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const minify = require('rollup-plugin-babel-minify')

const { webpack } = require('../craco-config')

const alias = aliases => ({
  resolveId(importee) {
    const alias = aliases[importee]

    return alias ? this.resolveId(alias) : null
  },
})

function bundle(name) {
  return async configProvider => {
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
    const {
      customize,
      cacheDirectory,
      cacheCompression,
      cacheIdentifier,
      ...options
    } = match.loader.options

    const inputOptions = {
      input: 'src/index.js',
      external: [
        'react-flying-saucer',
        'react-mothership',
        'react',
        'react-dom',
        'lodash',
      ],
      plugins: [
        alias(webpack.alias),
        babel({
          ...options,
          runtimeHelpers: true,
        }),
        resolve({
          jsnext: true,
          main: true,
          browser: true,
          extensions: ['.mjs', '.js', '.jsx', '.json'],
        }),
        commonjs(),
        minify({
          mangle: { topLevel: true },
        }),
      ],
    }

    const outputOptions = {
      name,
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: true,
      sourcemapFile: 'dist/index.js.map',
    }

    const bundle = await rollup.rollup(inputOptions)

    log(`Bundling ${name} with dependencies:`)
    log(bundle.watchFiles) // an array of file names this bundle depends on

    await bundle.write(outputOptions)
  }
}

module.exports = {
  bundle,
}
