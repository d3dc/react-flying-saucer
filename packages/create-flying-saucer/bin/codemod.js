import { packageJson, uninstall, install } from 'mrm-core'

// Execute in-order
replaceScripts()
replaceDependencies()

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
    './node_modules/flying-saucer/config-overrides'
  )

  file.save()
}

function replaceDependencies() {
  uninstall('react-scripts')
  install('flying-saucer')
}
