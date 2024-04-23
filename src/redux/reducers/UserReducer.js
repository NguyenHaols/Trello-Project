import { cloneDeep } from 'lodash'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':{
    return { ...action.payload }
  }
  case 'SELECTED_USER':{
    return state
  }


  default:
    return state
  }
}

export default userReducer