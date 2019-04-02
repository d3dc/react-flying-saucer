import { createFeature } from '@@'
import { lazy } from 'react'

export default lazy(() => import('./Start')) |> createFeature({ name: 'start' })
