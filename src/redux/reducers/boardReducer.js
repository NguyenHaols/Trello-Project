

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

  case 'REMOVE_MEMBER_CARD':{
    const { cardId, userId } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              members: card.members.filter(member => (member._id !== userId))
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

  case 'ADD_ATTACH_CARD' : {
    const { cardId, newAttach } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              attachs: [...card.attachs, newAttach]
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'REMOVE_TASK_CARD' : {
    const { cardId, taskId } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              tasks: card.tasks.filter(task => task._id !== taskId)
            }
          }
          return card
        })
      }))
    }
    return newState
  }

  case 'REMOVE_ATTACH_CARD' : {
    const { cardId, attachId } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              attachs: card.attachs.filter(attach => attach._id !== attachId)
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
    const { cardId, taskId, taskStatus } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            const updatedCard = {
              ...card,
              tasks: card.tasks.map(task => {
                if (task._id === taskId) {
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

  case 'UPDATE_CARD_TASK_ASSIGN_LIST': {
    const { cardId, taskId, userId } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            const updatedCard = {
              ...card,
              tasks: card.tasks.map(task => {
                if (task._id === taskId) {
                  return {
                    ...task,
                    userId: userId
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

  case 'UPDATE_CARD_TASK_DEADLINE': {
    const { cardId, taskId, deadline } = action.payload
    const newState = {
      ...state,
      columns: state.columns.map(column => ({
        ...column,
        cards: column.cards.map(card => {
          if (card._id === cardId) {
            const updatedCard = {
              ...card,
              tasks: card.tasks.map(task => {
                if (task._id === taskId) {
                  return {
                    ...task,
                    deadline: deadline
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