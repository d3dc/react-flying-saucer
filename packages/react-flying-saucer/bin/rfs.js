#!/usr/bin/env node
require('craco-flying-saucer/bootstrap')(
  () => require('@craco/craco/bin/craco.js'),
  require.resolve('../lib/craco-config')
)
