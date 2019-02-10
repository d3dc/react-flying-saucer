#!/usr/bin/env node
const path = require('path')
const configPath = path.relative(
  process.cwd(),
  require.resolve('../craco-config.js')
)

const defaultArgs = `--config ${configPath}`.split(' ')

const args = process.argv.slice(2)
const scriptIndex = args.findIndex(x => x === 'bundle')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

let processArgs, verbose

switch (script) {
  case 'assemble': {
    const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []
    const scriptPath = require.resolve(`../scripts/${script}`)
    const scriptArgs = args.slice(scriptIndex + 1)
    verbose = true
    processArgs = nodeArgs
      .concat(scriptPath)
      .concat(scriptArgs)
      .concat(defaultArgs)
    break
  }
  default:
    const scriptPath = require.resolve('@craco/craco/bin/craco.js')
    verbose = false
    processArgs = [scriptPath].concat(args).concat(defaultArgs)
    break
}

const child = spawn.sync('node', processArgs, { stdio: 'inherit' })

if (verbose && child.signal) {
  if (child.signal === 'SIGKILL') {
    console.log(`
            The build failed because the process exited too early.
            This probably means the system ran out of memory or someone called
            \`kill -9\` on the process.
        `)
  } else if (child.signal === 'SIGTERM') {
    console.log(`
            The build failed because the process exited too early.
            Someone might have called  \`kill\` or \`killall\`, or the system could
            be shutting down.
        `)
  }

  process.exit(1)
}

process.exit(child.status)
