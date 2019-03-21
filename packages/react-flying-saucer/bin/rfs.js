#!/usr/bin/env node
const path = require('path')
const spawn = require('cross-spawn')

const configPath = path.relative(
  process.cwd(),
  require.resolve('../lib/craco-config')
)
const scriptsPath = path.dirname(require.resolve('react-scripts/package.json'))

const defaultArgs = ['--react-scripts', scriptsPath, '--config', configPath]

const args = process.argv.slice(2)
const cracoPath = require.resolve('@craco/craco/bin/craco.js')

const processArgs = [cracoPath].concat(args).concat(defaultArgs)
const child = spawn.sync('node', processArgs, { stdio: 'inherit' })

process.exit(child.status)
