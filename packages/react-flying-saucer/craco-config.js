const path = require('path')

const babel = {
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
      'no-unused-expressions': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    globals: {
      _: true,
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
    '@@': 'react-flying-saucer',
    '@': path.resolve('src'),
  },
}

module.exports = {
  webpack,
  jest,
  babel,
  eslint,
  plugins: [{ plugin: require('./craco-plugin') }],
}
