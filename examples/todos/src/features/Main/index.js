import { createFeature } from '@@'
import views from './views'
import Main from './Main'

import 'todomvc-app-css'

export default createFeature({ views })(Main)
