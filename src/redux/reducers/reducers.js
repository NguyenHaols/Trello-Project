import workspaceReducer from './workspaceReducer'
import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import boardReducer from './boardReducer'
import memberReducer from './memberReducer'

const rootReducer = combineReducers({
  workspace : workspaceReducer,
  user : userReducer,
  board : boardReducer,
  member: memberReducer
})

export default rootReducer