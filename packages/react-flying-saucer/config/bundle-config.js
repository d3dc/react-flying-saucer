const cracoConfig = require('./craco-config')

cracoConfig.plugins.push({ plugin: require('../lib/PluginCreateBundle') })

module.exports = cracoConfig
