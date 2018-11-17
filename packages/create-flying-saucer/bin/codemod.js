import { packageJson, uninstall, install, copyFiles, makeDirs } from 'mrm-core'

export default function codemod(projectName) {
  // Execute in-order
  process.chdir(projectName)
  replaceScripts()
  replaceDependencies()
  addTemplates()

  function replaceScripts() {
    const file = packageJson()

    if (!file.exists()) {
      console.error('package.json not found!')
      return
    }

    file.setScript('start', 'flying-saucer start')
    file.setScript('build', 'flying-saucer build')
    file.setScript('test', 'flying-saucer test')

    file.set(
      'config-overrides-path',
      'node_modules/flying-saucer/config-overrides'
    )

    file.save()
  }

  function replaceDependencies() {
    install('flying-saucer')
    uninstall('react-scripts')
  }

  function addTemplates() {
    makeDirs(['src/modules', 'src/modules/Main'])
    copyFiles('src/App.jsx', 'src/modules/Main/Hello.jsx')
    copyFiles('src/App.test.jsx', 'src/modules/Main/Hello.test.jsx')
    copyFiles('node_modules/flying-saucer/templates/src/App.jsx', 'src/App.jsx')
    copyFiles(
      'node_modules/flying-saucer/templates/src/module-main/index.js',
      'src/modules/Main/index.js'
    )
    copyFiles(
      'node_modules/flying-saucer/templates/src/module-main/Main.jsx',
      'src/modules/Main/Main.jsx'
    )
    copyFiles(
      'node_modules/flying-saucer/templates/src/module-main/routes.js',
      'src/modules/Main/routes.js'
    )
    copyFiles('node_modules/flying-saucer/templates/babelrc.json', '.babelrc')
    copyFiles('node_modules/flying-saucer/templates/eslintrc.json', '.eslintrc')
  }
}
