import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
axios.defaults.withCredentials = true


axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error);
})

// Board
export const fetchBoardDetailsAPI = async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const createNewBoardAPI = async(boardData) => {
  const response = await axios.post(`${API_ROOT}/v1/boards`, boardData)
  return response.data
}

export const updateBoardDetailsAPI = async(boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async(updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/movingCard`, updateData)
  return response.data
}

export const deleteBoardAPI = async(boardId) => {
  const response = await axios.post(`${API_ROOT}/v1/boards/delete`, boardId)
  return response.data
}
// end board


// Column
export const createNewColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async(columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async(columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// end column


// Card
export const createNewCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const addMemberCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/addMember`, data, {
    withCredentials: true
  })
  return response.data
}

export const removeMemberCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/removeMember`, data)
  return response.data
}

export const updateCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/update`, data)
  return response.data
}

export const deleteCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/delete`, data)
  return response.data
}

export const updateTaskCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/updateTask`, data)
  return response.data
}

export const updateTaskAssignCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/updateTaskAssign`, data)
  return response.data
}

export const updateTaskTimeCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/updateTaskTime`, data)
  return response.data
}

export const addTaskCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/addTask`, data)
  return response.data
}

export const removeTaskCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/removeTask`, data)
  return response.data
}

export const addAttachCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/addAttach`, data)
  return response.data
}

export const removeAttachCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/removeAttach`, data)
  return response.data
}

// end card

// user

export const loginApi = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/login`, userData, {
    withCredentials: true
  })
  return response.data
}

export const registerApi = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users`, userData)
  return response.data
}

export const getUser = async () => {
  const response = await axios.get(`${API_ROOT}/v1/users/getUser`, {
    withCredentials: true
  })
  return response.data
}

export const updateUser = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/update`, data, {
    withCredentials: true
  })
  return response.data
}

export const updatePasswordAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/updatePassword`, data, {
    withCredentials: true
  })
  return response.data
}

export const addStarreddAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/addStarred`, data, {
    withCredentials: true
  })
  return response.data
}

export const removeStarreddAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/removeStarred`, data, {
    withCredentials: true
  })
  return response.data
}


// end user


// upload image

export const uploadImageAPI = async (image) => {
  const response = await axios.post(`${API_ROOT}/v1/image/upload`, image, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const uploadFileAPI = async (file) => {
  const response = await axios.post(`${API_ROOT}/v1/image/uploadFile`, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}


// end upload image


// Workspace

export const addMemberAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/workspace/member/addMember`, data, {
    withCredentials: true
  })
  return response.data
}

export const removeMemberAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/workspace/member/removeMember`, data,{
    withCredentials: true
  })
  return response.data
}

export const createNewWorkspaceAPI = async(workspaceData) => {
  const response = await axios.post(`${API_ROOT}/v1/workspaces/createWorkspace`, workspaceData)
  return response.data
}

export const updateWorkspaceAPI = async(newData) => {
  const response = await axios.post(`${API_ROOT}/v1/workspaces/update`, newData)
  return response.data
}

export const deleteWorkspaceAPI = async(id) => {
  const response = await axios.post(`${API_ROOT}/v1/workspaces/delete`, id)
  return response.data
}

// end workspace

// start comments
export const addCommentAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/comments/postComment`, data)
  return response.data
}

export const deleteCommentAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/comments/deleteComment`, data)
  return response.data
}

export const updateCommentAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/comments/updateContent`, data)
  return response.data
}
// end comments

// send email
export const sendEmailAPI= async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/email/sendEmail`, data)
  return response.data
}
//

// start recover password
export const recoverPasswordAPI= async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/recoverPassword`, data)
  return response.data
}

// end  recover


// start workspace-members
export const getMembersByWorkspaceIdAPI= async(workspaceId) => {
  const response = await axios.get(`${API_ROOT}/v1/workspace/member/getMembersByWorkspaceId/${workspaceId}`, {
    withCredentials: true
  })
  return response.data
}
// end workspace-members

// Notification

export const getNotifiAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/notifications/getNotificationsByReceiver`, data)
  return response.data
}

export const setIsReadAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/v1/notifications/setIsRead`, data)
  return response.data
}

// End notification

