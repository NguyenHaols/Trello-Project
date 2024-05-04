import workspaceReducer from './workspaceReducer'
import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import boardReducer from './boardReducer'

const rootReducer = combineReducers({
  workspace : workspaceReducer,
  user : userReducer,
  board : boardReducer
})

export default rootReducer