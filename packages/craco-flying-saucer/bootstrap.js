const path = require('path')
const fs = require('fs')

const projectRoot = fs.realpathSync(process.cwd())
const packageJsonPath = path.join(projectRoot, 'package.json')
const configPath = path.relative(process.cwd(), __dirname)

module.exports = function bootstrap(guarded) {
  const originalPackageData = fs.readFileSync(packageJsonPath)
  const packageJson = JSON.parse(originalPackageData)

  packageJson.cracoConfig = configPath

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson))

  guarded()

  fs.writeFileSync(packageJsonPath, originalPackageData)
}
