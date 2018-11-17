#!/usr/bin/env node
const path = require('path')
const commander = require('commander')
const {
  packageJson,
  uninstall,
  install,
  deleteFiles,
  copyFiles,
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

process.chdir(projectName)
// Execute in-order
replaceDependencies()
replaceScripts()
addDotfiles()
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
  file.removeScript('eject')

  file.set(
    'config-overrides-path',
    'node_modules/flying-saucer/config-overrides'
  )

  file.save()
}

function replaceDependencies() {
  install('flying-saucer', { dev: true })
  uninstall('react-scripts', { dev: false })
}

function addDotfiles() {
  clone('.babelrc', 'babelrc.json')
  clone('.eslintrc', 'eslintrc.json')
}

function addTemplates() {
  makeDirs(['src/modules', 'src/modules/Main'])
  cloneLocal('src/modules/Main/App.css', 'src/App.css')
  deleteFiles('src/App.css')
  cloneLocal('src/modules/Main/App.js', 'src/App.js')
  cloneLocal('src/modules/Main/App.test.js', 'src/App.test.js')
  clone('src/App.js', 'src/App.js')
  clone('src/modules/Main/index.js', 'src/module-main/index.js')
  clone('src/modules/Main/Main.js', 'src/module-main/Main.js')
  clone('src/modules/Main/routes.js', 'src/module-main/routes.js')
}
