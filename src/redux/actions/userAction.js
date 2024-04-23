
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