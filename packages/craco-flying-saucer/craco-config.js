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

// Preset was broken, here it is in full
const eslint = {
  configure: {
    // extends: [require('eslint-config-techno-babel')],
    rules: {
      semi: ['error', 'never'],
      'no-unused-expressions': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  loaderOptions: { useEslintrc: true },
}

const jest = {
  configure: {
    moduleNameMapper: {
      '@@$': 'react-flying-saucer',
      '@/(.*)$': '<rootDir>/src/$1',
    },
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
}
