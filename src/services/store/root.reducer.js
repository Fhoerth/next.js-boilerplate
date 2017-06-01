import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import helloWorld from 'modules/helloWorld/helloWorld.reducer'

const rootReducer = combineReducers({
  routing,
  helloWorld
})

export default rootReducer
