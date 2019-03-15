const {
  getLoaders,
  loaderByName,
  throwUnexpectedConfigError,
} = require('@craco/craco')

// const merge = require('lodash/merge')
const castArray = require('lodash/castArray')

module.exports = {
  overrideWebpackConfig({ webpackConfig, cracoConfig }) {
    if (!cracoConfig.customBabel) {
      return webpackConfig
    }

    const { hasFoundAny, matches } = getLoaders(
      webpackConfig,
      loaderByName('babel-loader')
    )

    if (!hasFoundAny) {
      return webpackConfig
    }

    const {
      externalPaths = [],
      presets,
      plugins,
      loaderOptions,
    } = cracoConfig.customBabel

    matches.forEach(({ loader }) => {
      if (loader.options.customize) {
        const basePresets = loader.options.presets
        const basePlugins = loader.options.plugins

        Object.assign(loader.options, loaderOptions, {
          presets: basePresets.concat(presets),
          plugins: basePlugins.concat(plugins),
        })

        if (externalPaths.length) {
          loader.include = castArray(loader.include).concat(externalPaths)

          loader.exclude = {
            test: loader.exclude || /node_modules/,
            not: externalPaths,
          }
        }
      }
    })

    return webpackConfig
  },
}
