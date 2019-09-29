const path = require('path')
const fs = require('fs')

const projectRoot = fs.realpathSync(process.cwd())
const packageJsonPath = path.join(projectRoot, 'package.json')
const backupPath = packageJsonPath + '.backup'
const defaultConfigPath = path.relative(process.cwd(), __dirname)

module.exports = function bootstrap(guarded, configPath = defaultConfigPath) {
  const originalPackageData = fs.readFileSync(packageJsonPath)
  const packageJson = JSON.parse(originalPackageData)

  packageJson.cracoConfig = configPath

  fs.renameSync(packageJsonPath, backupPath)
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson))

  guarded()

  fs.unlinkSync(packageJsonPath)
  fs.renameSync(backupPath, packageJsonPath)
}
