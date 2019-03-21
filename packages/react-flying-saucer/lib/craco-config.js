const baseConfig = require('craco-flying-saucer')

baseConfig.webpack.alias['react-mothership'] = require.resolve(
  'react-mothership'
)

module.exports = baseConfig
