const path = require('path')

const localPath = p => path.resolve(__dirname, p)

const babel = {
  presets: ['techno-babel'],
  plugins: [
    'react-require',
    [
      'import',
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
    extends: ['techno-babel'],
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
    '@(.*)$': '<rootDir>/src/$1',
  }

  return config
}

const webpack = {
  alias: {
    '@': localPath('src/'),
  },
}

module.exports = { babel, eslint, jest, webpack }
