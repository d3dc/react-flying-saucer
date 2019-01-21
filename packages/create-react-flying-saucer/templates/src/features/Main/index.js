import { createFeature } from '@@'

import models from './models'
import views from './views'
import Main from './Main'

import logoSrc from './logo.svg'

export default Main |> createFeature({
    views,
    models,
    provides: { logoSrc }
})
