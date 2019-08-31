#!/usr/bin/env node
migrateExistingApp()

function migrateExistingApp() {
  const codemods = require('../codemods')
  const addTemplate = process.argv[2].toLowerCase() === '--template'

  codemods.replaceDependencies()
  codemods.replaceScripts()
  codemods.modifyEnv()

  if (addTemplate) {
    codemods.addTemplate()
  }
}
