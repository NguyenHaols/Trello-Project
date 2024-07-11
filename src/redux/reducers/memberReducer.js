
const initialState = []

const memberReducer = ( state = initialState, action) => {
  switch (action.type) {
  case 'SET_MEMBER':{
    return [...action.payload]
  }
  case 'ADD_MEMBER' : {
    const user = action.payload
    const newState = [...state, user]
    return newState
  }
  case 'REMOVE_MEMBER' : {
    const userId = action.payload
    const members = state.filter(member => {
        console.log(member._id, userId )
      return member._id !== userId
    })
    console.log(members)
    return members
  }
  case 'CLEAR_MEMBER':{
    return []
  }
  default:
    return state
  }
}


export default memberReducer