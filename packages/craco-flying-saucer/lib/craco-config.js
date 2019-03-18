const path = require('path')

const customBabel = {
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

// Preset was broken, here it is in full
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
    '@/(.*)$': '<rootDir>/src/$1',
  }

  return config
}

const webpack = {
  alias: {
    /**
     * Use the top-most react for all bundles.
     * Hooks break if they aren't all from one
     * node_modules
     */
    react: path.resolve('node_modules/react'),
    '@@': 'react-flying-saucer',
    '@': path.resolve('src'),
  },
}

module.exports = {
  webpack,
  jest,
  customBabel,
  eslint,
  plugins: [{ plugin: require('./craco-plugin') }],
}
