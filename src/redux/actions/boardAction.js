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

export const removeMemberCardAction = (cardId,userId) => {
  return {
    type : 'REMOVE_MEMBER_CARD',
    payload: {cardId, userId}
  }
}

export const addTaskCardAction = ({cardId,newTask}) => {
  return {
    type : 'ADD_TASK_CARD',
    payload: {cardId, newTask}
  }
}

export const addAttachCardAction = (cardId,newAttach) => {
  return {
    type : 'ADD_ATTACH_CARD',
    payload: {cardId, newAttach}
  }
}

export const removeAttachCardAction = (cardId,attachId) => {
  return {
    type : 'REMOVE_ATTACH_CARD',
    payload: {cardId, attachId}
  }
}

export const removeTaskCardAction = (cardId,taskId) => {
  return {
    type : 'REMOVE_TASK_CARD',
    payload: {cardId, taskId}
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

export const updateTaskListCardAction = (cardId,taskId,taskStatus) => {
  return {
    type : 'UPDATE_CARD_TASK_LIST',
    payload: {cardId, taskId, taskStatus}
  }
}

export const updateTaskCardAssignAction = (cardId,taskId,userId) => {
  return {
    type : 'UPDATE_CARD_TASK_ASSIGN_LIST',
    payload: {cardId, taskId, userId}
  }
}

export const updateTaskDeadlineCardAction = (cardId,taskId,deadline) => {
  return {
    type : 'UPDATE_CARD_TASK_DEADLINE',
    payload: {cardId, taskId, deadline}
  }
}


