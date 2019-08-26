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

const jest = {
  configure: {
    moduleNameMapper: {
      '@@$': 'react-flying-saucer',
      '@/(.*)$': '<rootDir>/src/$1',
    },
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
}
