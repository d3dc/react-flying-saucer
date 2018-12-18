import { createFeature } from '@@'

import views from './views'
import models from './models'
import Account from './Account'

export default createFeature({ views, models })(Account)
