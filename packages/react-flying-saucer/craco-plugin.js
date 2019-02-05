const path = require('path')
const {
  getLoaders,
  loaderByName,
  throwUnexpectedConfigError,
} = require('@craco/craco')

function getExternalFeatures() {
  const package = require(path.join(process.cwd(), 'package.json'))

  return package.externalFeatures.map(name => require.resolve(name))
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

    const externalFeatures = getExternalFeatures()

    const {
      externalPaths,
      presets,
      plugins,
      loaderOptions,
    } = cracoConfig.customBabel

    matches.forEach(({ loader }) => {
      if (loader.options.customize) {
        Object.assign(loader.options, loaderOptions, {
          presets: [...loader.options.presets, ...presets],
          plugins: [...loader.options.plugins, ...plugins],
        })

        if (externalPaths) {
          loader.include = (Array.isArray(loader.include)
            ? loader.include
            : [loader.include]
          ).concat(externalPaths)

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
