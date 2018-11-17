import { init } from '@rematch/core'
import preset from './rematch-preset'

export default function(config, app) {
  const store = init({
    preset,
    ...config,
  })

  app.store = store

  return store
}
