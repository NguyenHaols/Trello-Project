export const addMemberAction = ( user) => {
  return {
    type :'ADD_MEMBER',
    payload: user
  }
}

export const removeMemberAction = (userId) => {
  return {
    type :'REMOVE_MEMBER',
    payload: userId
  }
}

export const setMemberAction = (members) => {
  return {
    type: 'SET_MEMBER',
    payload: members
  }
}

export const clearMemberAction = () => {
  return {
    type: 'CLEAR_MEMBER'
  }
}