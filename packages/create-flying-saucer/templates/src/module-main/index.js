import { createModule } from 'flying-saucer'
import routes from './routes'
import Main from './Main'

export default createModule({ routes })(Main)
