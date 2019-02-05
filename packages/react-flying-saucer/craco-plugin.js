const path = require('path')
const {
  getLoaders,
  loaderByName,
  throwUnexpectedConfigError,
} = require('@craco/craco')

function getExternalFeatures() {
  const package = require(path.resolve('package.json'))

  return package.externalFeatures.map(name => path.resolve(name))
}

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
      externalPaths,
      presets,
      plugins,
      loaderOptions,
    } = cracoConfig.customBabel

    const externalFeatures = getExternalFeatures()

    const external = [...externalPaths, ...externalFeatures]

    matches.forEach(({ loader }) => {
      if (loader.options.customize) {
        Object.assign(loader.options, loaderOptions, {
          presets: [...loader.options.presets, ...presets],
          plugins: [...loader.options.plugins, ...plugins],
        })

        if (external.length) {
          loader.include = (Array.isArray(loader.include)
            ? loader.include
            : [loader.include]
          ).concat(external)

          loader.exclude = {
            test: loader.exclude || /node_modules/,
            not: external,
          }
        }
      }
    })

    return webpackConfig
  },
}
