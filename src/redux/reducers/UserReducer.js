

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':{
    return { ...action.payload }
  }
  case 'SELECTED_USER':{
    return state
  }
  case 'ADD_BOARD_TO_WORKSPACE':{
    const { workspaceId, board } = action.payload
    const newState = { ...state }

    newState.workspaces = newState.workspaces.map(workspace => {
      if (workspace._id === workspaceId) {
        const updatedWorkspace = { ...workspace }
        updatedWorkspace.boards = updatedWorkspace.boards.concat(board)
        return updatedWorkspace
      } else {
        return workspace
      }
    })

    return newState

  }

  case 'UPDATE_USER' : {
    const newInfor = action.payload
    const newUserState = {
      ...state,
      username: newInfor.username,
      avatar: newInfor.avatar,
      phoneNumber: newInfor.phoneNumber }
    return newUserState
  }

  case 'UPDATE_WORKSPACE' : {
    const {workspaceId, newData} = action.payload
    const newState = {
      ...state,
      workspaces: state.workspaces.map(workspace => {
        if (workspace._id === workspaceId) {
          return {
            ...workspace,
            ...newData
          }
        }
        return workspace
      })
    }
    return newState
  }

  case 'REMOVE_WORKSPACE': {
    const workspaceId = action.payload
    const newState = {
      ...state,
      workspaces: state.workspaces.filter(workspace => workspace._id !== workspaceId)
    }
    return newState
  }

  case 'ADD_WORKSPACE' : {
    const workspace = action.payload
    const newUserState = {
      ...state,
      workspaces: state.workspaces.concat(workspace)
    }
    return newUserState
  }


  default:
    return state
  }
}

export default userReducer