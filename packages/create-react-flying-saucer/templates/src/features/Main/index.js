import { createFeature } from '@@'

import provides from './provides'
import models from './models'
import views from './views'
import Main from './Main'

export default createFeature({ views, models, provides })(Main)
