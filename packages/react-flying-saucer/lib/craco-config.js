const baseConfig = require('craco-flying-saucer')

// Automatically uses a single version of react-mothership (the one for this package)
// in case a tool like lerna hasn't hoisted it.
baseConfig.webpack.alias['react-mothership'] = require.resolve(
  'react-mothership'
)

module.exports = baseConfig
