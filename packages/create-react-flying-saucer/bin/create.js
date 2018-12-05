#!/usr/bin/env node
createFreshApp()
migrateFreshApp()

function createFreshApp() {
  const path = require('path')
  const execSync = require('child_process').execSync
  const argString = process.argv.slice(2).join(' ')

  const craPath = path.resolve(
    __dirname,
    '../node_modules/create-react-app/index.js'
  )

  try {
    execSync(`${craPath} ${argString}`, { stdio: 'inherit' })
  } catch (e) {
    /*stderr is inherited*/
  }
}

function migrateFreshApp() {
  const codemods = require('../codemods')
  const projectName = process.argv[2]

  process.chdir(projectName)

  codemods.replaceDependencies()
  codemods.replaceScripts()
  codemods.addTemplate()
  codemods.removeOriginalFiles()
}
