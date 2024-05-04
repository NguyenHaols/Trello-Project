
export const setUser = (user) => {
  return {
    type : 'SET_USER',
    payload : user
  }
}

export const selectedUser = (user) => {
  return {
    type : 'SELECTED_USER',
    payload : user
  }
}

export const addWorkspaceAction = (workspace) => {
  return {
    type :'ADD_WORKSPACE',
    payload: workspace
  }
}

export const addBoardToWorkspace = (workspaceId, board) => {
  return {
    type :'ADD_BOARD_TO_WORKSPACE',
    payload: { workspaceId, board }
  }
}

export const updateUser = (newinfor) => {
  return {
    type :'UPDATE_USER',
    payload: newinfor
  }
}

export const updateWorkspaceAction = (workspaceId,newData) => {
  return {
    type :'UPDATE_WORKSPACE',
    payload: {workspaceId, newData}
  }
}

export const removeWorkspaceAction = (workspaceId) => {
  return {
    type :'REMOVE_WORKSPACE',
    payload: workspaceId
  }
}

export const addMemberAction = (workspaceId, user) => {
  return {
    type :'ADD_MEMBER',
    payload: { workspaceId, user }
  }
}

export const removeMemberAction = (workspaceId, userId) => {
  return {
    type :'REMOVE_MEMBER',
    payload: { workspaceId, userId }
  }
}