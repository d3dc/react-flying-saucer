import { init } from '@rematch/core'
import preset from './rematchPreset'

export default config =>
  init({
    preset,
    ...config,
  })
