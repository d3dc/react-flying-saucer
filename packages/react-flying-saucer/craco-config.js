const path = require('path')
const {
  getLoaders,
  loaderByName,
  throwUnexpectedConfigError,
} = require('@craco/craco')

const customBabelOverridePlugin = {
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
      externalLibs,
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

        if (externalLibs) {
          loader.include = (Array.isArray(loader.include)
            ? loader.include
            : [loader.include]
          ).concat(externalLibs)

          loader.exclude = {
            test: loader.exclude || /node_modules/,
            not: externalLibs,
          }
        }
      }
    })

    return webpackConfig
  },
}

const customBabel = {
  externalLibs: [__dirname],
  presets: [require.resolve('babel-preset-techno-babel')],
  plugins: [
    require('babel-plugin-react-require').default,
    [
      require('babel-plugin-import').default,
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
    ],
  ],
  loaderOptions: {
    babelrc: true,
  },
}

const eslint = {
  configure: {
    // extends: [require('eslint-config-techno-babel')],
    rules: {
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
    },
  },
  loaderOptions: { useEslintrc: true },
}

const jest = config => {
  config.moduleNameMapper = {
    ...config.moduleNameMapper,
    '@@$': 'react-flying-saucer',
    '@(.*)$': '<rootDir>/src/$1',
  }

  return config
}

const webpack = {
  alias: {
    '@': path.resolve('src'),
    '@@': 'react-flying-saucer',
  },
}

module.exports = {
  webpack,
  jest,
  customBabel,
  eslint,
  plugins: [{ plugin: customBabelOverridePlugin }],
}
