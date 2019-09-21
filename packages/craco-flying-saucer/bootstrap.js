const path = require('path')
const fs = require('fs')

const projectRoot = fs.realpathSync(process.cwd())
const packageJsonPath = path.join(projectRoot, 'package.json')
const configPath = path.relative(
  process.cwd(),
  require.resolve('craco-flying-saucer')
)


module.exports = function bootstrap(guarded) {
  const originalPackageData = fs.readFileSync(packageJsonPath(packageJsonPath)
  const package = JSON.parse(originalPackageData)
  
  package.cracoConfig = configPath
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(package))
  
  guarded()

  fs.writeFileSync(packageJsonPath, originalPackageData)
}