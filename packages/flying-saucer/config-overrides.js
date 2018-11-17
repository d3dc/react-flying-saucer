const path = require('path')
const {
  override,
  addWebpackAlias,
  useBabelRc,
  useEslintRc,
  fixBabelImports,
} = require('customize-cra')

const localPath = p => path.resolve(__dirname, p)

const jest = config => {
  config.moduleNameMapper = {
    ...config.moduleNameMapper,
    '@(.*)$': '<rootDir>/src/$1',
  }

  return config
}

const webpack = override(
  useBabelRc(),
  useEslintRc(),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
  addWebpackAlias({ ['@']: localPath('src/') })
)

module.exports = { webpack, jest }
