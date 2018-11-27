#!/usr/bin/env node
const path = require('path')
const configPath = path.relative(
  process.cwd(),
  require.resolve('../craco-config.js')
)

const args = `--config ${configPath}`

process.argv.push(...args.split(' '))
require('@craco/craco/bin/craco.js')
