import workspaceReducer from './workspaceReducer'
import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import boardReducer from './boardReducer'
import memberReducer from './memberReducer'
import languageReducer from './languageReducer'

const rootReducer = combineReducers({
  workspace : workspaceReducer,
  user : userReducer,
  board : boardReducer,
  member: memberReducer,
  language: languageReducer
})

export default rootReducer