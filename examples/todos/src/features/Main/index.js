import { createFeature } from '@@'
import views from './views'
import models from './models'
import Main from './Main'

import 'todomvc-app-css/index.css'

export default createFeature({ views, models })(Main)
