export const setBoardAction = (board) => {
  return {
    type : 'SET_BOARD',
    payload : board
  }
}

export const addCommentAction = (cardId, comment) => {
  return {
    type : 'ADD_COMMENT',
    payload : { cardId, comment }
  }
}

export const removeCommentAction = (cardId, commentId) => {
  return {
    type: 'REMOVE_COMMENT',
    payload: {cardId, commentId}
  }
}

export const updateCommentAction = (cardId, commentId, newContent) => {
  return {
    type: 'UPDATE_COMMENT',
    payload: {cardId, commentId, newContent}
  }
}

export const removeBoardAction = () => {
  return {
    type : 'REMOVE_BOARD'
  }
}

export const removeCardAction = (cardId) => {
  return {
    type : 'REMOVE_CARD',
    payload: cardId
  }
}

export const addMemberCardAction = (cardId,user) => {
  return {
    type : 'ADD_MEMBER_CARD',
    payload: {cardId, user}
  }
}

export const addTaskCardAction = ({cardId,newTask}) => {
  return {
    type : 'ADD_TASK_CARD',
    payload: {cardId, newTask}
  }
}

export const removeTaskCardAction = (cardId,taskName) => {
  return {
    type : 'REMOVE_TASK_CARD',
    payload: {cardId, taskName}
  }
}

export const updateStatusCardAction = (cardId,status) => {
  return {
    type : 'UPDATE_CARD_STATUS',
    payload: {cardId, status}
  }
}

export const updateDeadlineCardAction = (cardId,time) => {
  return {
    type : 'UPDATE_CARD_DEADLINE',
    payload: {cardId, time}
  }
}

export const updateDescriptionCardAction = (cardId,description) => {
  return {
    type : 'UPDATE_CARD_DESCRIPTION',
    payload: {cardId, description}
  }
}

export const updateTaskListCardAction = (cardId,taskName,taskStatus) => {
  return {
    type : 'UPDATE_CARD_TASK_LIST',
    payload: {cardId, taskName, taskStatus}
  }
}

