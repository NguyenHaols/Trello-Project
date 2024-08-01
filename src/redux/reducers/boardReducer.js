

const initialState = []

const boardReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'SET_BOARD':{
    return { ...action.payload }
  }
  case 'ADD_COMMENT':{
    const { cardId, comment } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              comments: [comment, ...card.comments]
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'REMOVE_COMMENT': {
    const { cardId, commentId } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              comments: card.comments.filter(comment => comment._id !== commentId)
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'UPDATE_COMMENT': {
    const { cardId, commentId, newContent } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              comments: card.comments.map(comment => {
                if (comment._id === commentId) {
                  return {
                    ...comment,
                    content : newContent
                  }
                }
                return comment
              })
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'ADD_MEMBER_CARD':{
    const { cardId, user } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              members: [...card.members, user]
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'ADD_TASK_CARD' : {
    const { cardId, newTask } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              tasks: [...card.tasks, newTask]
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'REMOVE_BOARD':{
    return {}
  }

  case 'UPDATE_CARD_STATUS':{
    const { cardId, status } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              status: status
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'UPDATE_CARD_DESCRIPTION':{
    const { cardId, description } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              description: description
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'UPDATE_CARD_DEADLINE' : {
    const { cardId, time } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              deadline: time
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'UPDATE_CARD_TASK_LIST': {
    const { cardId, taskName, taskStatus } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            const updatedCard = {
              ...card,
              tasks: card.tasks.map(task => {
                if (task.taskName === taskName) {
                  return {
                    ...task,
                    taskStatus: !taskStatus
                  }
                }
                return task
              })
            }
            return updatedCard
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'REMOVE_CARD' : {
    const cardId = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.filter(card => card._id !== cardId)
      }))
    }
    return newState
  }


  default:
    return state

  }
}

export default boardReducer