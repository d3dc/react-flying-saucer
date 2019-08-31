#!/usr/bin/env node
const path = require('path')
const { packageJson, lines, uninstall, install } = require('mrm-core')
const { copySync, ensureDirSync, removeSync } = require('fs-extra')

function replaceDependencies() {
  install(
    ['react-flying-saucer', 'lodash', 'eslint-config-react-flying-saucer'],
    { dev: false }
  )
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

  file.merge({
    eslintConfig: {
      extends: ['react-flying-saucer'],
      rules: {
        semi: ['error', 'never'],
      },
    },
  })

  file.save()
}

function modifyEnv() {
  const file = lines('.env')
  file.add('EXTEND_ESLINT=true')
  file.save()
}

function addTemplate() {
  ensureDirSync('src/features/Main')
  copySync(path.join(__dirname, 'templates/src'), 'src')
}

function removeOriginalFiles() {
  removeSync('src/App.css')
  removeSync('src/logo.svg')
}

module.exports = {
  removeOriginalFiles,
  replaceDependencies,
  replaceScripts,
  addTemplate,
  modifyEnv,
}
