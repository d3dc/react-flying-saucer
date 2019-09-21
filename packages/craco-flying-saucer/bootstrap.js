const path = require('path')
const fs = require('fs')

const projectRoot = fs.realpathSync(process.cwd())
const packageJsonPath = path.join(projectRoot, 'package.json')

const configPath = path.relative(
  process.cwd(),
  require.resolve('craco-flying-saucer')
)

const package = require(packageJsonPath)
package.cracoConfig = configPath

require.cache[packageJsonPath].exports = package
