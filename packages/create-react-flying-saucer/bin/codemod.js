#!/usr/bin/env node
const path = require('path')
const {
  packageJson,
  uninstall,
  install,
  deleteFiles,
  makeDirs,
  template,
} = require('mrm-core')

const clone = (to, from) =>
  template(to, path.join(__dirname, '../templates', from))
    .apply()
    .save()

const cloneLocal = (to, from) =>
  template(to, path.join(process.cwd(), from))
    .apply()
    .save()

const projectName = process.argv[2]

// Execute in-order
process.chdir(projectName)
replaceDependencies()
replaceScripts()
addTemplates()

function replaceDependencies() {
  install('react-flying-saucer', { dev: false })
}

function replaceScripts() {
  const file = packageJson()

  if (!file.exists()) {
    console.error('package.json not found!')
    return
  }

  file.setScript('start', 'react-flying-saucer start')
  file.setScript('build', 'react-flying-saucer build')
  file.setScript('test', 'react-flying-saucer test')
  file.removeScript('eject')

  file.unset('eslintConfig')

  file.save()
}

function addTemplates() {
  makeDirs(['src/modules', 'src/modules/Main'])
  clone('src/modules/Main/index.js', 'src/module-main/index.js')
  clone('src/modules/Main/Main.js', 'src/module-main/Main.js')
  clone('src/modules/Main/routes.js', 'src/module-main/routes.js')
  cloneLocal('src/modules/Main/App.js', 'src/App.js')
  cloneLocal('src/modules/Main/App.test.js', 'src/App.test.js')
  cloneLocal('src/modules/Main/App.css', 'src/App.css')
  deleteFiles('src/App.css')
  cloneLocal('src/modules/Main/logo.svg', 'src/logo.svg')
  deleteFiles('src/logo.svg')
  clone('src/App.js', 'src/App.js')
}
