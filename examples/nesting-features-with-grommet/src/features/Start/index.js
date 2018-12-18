import { createFeature } from '@@'
import { lazy } from 'react'

export default createFeature({ name: 'start' })(lazy(~import('./Start')))
