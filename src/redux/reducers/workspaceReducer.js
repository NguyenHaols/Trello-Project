
const initialState = []

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_WORKSPACES':{
    return state

  }
  case 'UPDATE_WORKSPACES':{
    return state

  }


  default:
    return state

  }
}

export default workspaceReducer