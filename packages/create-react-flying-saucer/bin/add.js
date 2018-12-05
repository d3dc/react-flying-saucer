#!/usr/bin/env node
createFeatureTemplate()

function createFeatureTemplate() {
  const { copySync, ensureDirSync } = require('fs-extra')
  const featurePath = `src/features/${process.argv[2]}`

  ensureDirSync(featurePath)
  // TODO: Handlebars would be nice here...
  copySync(path.join(__dirname, '../templates/src/features/Main'), featurePath)
}
