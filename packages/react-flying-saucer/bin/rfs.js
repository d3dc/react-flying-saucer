#!/usr/bin/env node
const path = require('path')
const spawn = require('cross-spawn')

const withConfig = configPath => ['--config', configPath]
const resolveConfig = pathToConfig =>
  path.relative(process.cwd(), require.resolve(pathToConfig))

const args = process.argv.slice(2)
const scriptIndex = args.findIndex(x => x === 'bundle')

const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []
const scriptArgs = scriptIndex > 0 ? args.slice(scriptIndex + 1) : args.slice(1)

let configArgs
let realScript

switch (script) {
  case 'bundle':
    configArgs = withConfig(resolveConfig('../config/bundle-config.js'))
    realScript = ['build']

    break

  default:
    configArgs = withConfig(resolveConfig('../config/craco-config.js'))
    realScript = [script]

    break
}

const cracoPath = require.resolve('@craco/craco/bin/craco.js')

const newArgs = nodeArgs
  .concat(realScript)
  .concat(configArgs)
  .concat(scriptArgs)

const processArgs = [cracoPath, ...newArgs]

const child = spawn.sync('node', processArgs, { stdio: 'inherit' })

process.exit(child.status)
