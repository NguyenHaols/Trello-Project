import workspaceReducer from './workspaceReducer'
import { combineReducers } from 'redux'
import userReducer from './UserReducer'

const rootReducer = combineReducers({
  workspace : workspaceReducer,
  user : userReducer
})

export default rootReducer