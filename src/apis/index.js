import axios from 'axios'
import asiox from 'axios'
import { API_ROOT } from '~/utils/constants'

// Tim hieu them interceptors

// Board
export const fetchBoardDetailsAPI = async(boardId) => {
  const response = await asiox.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const createNewBoardAPI = async(boardData) => {
  const response = await asiox.post(`${API_ROOT}/v1/boards`, boardData)
  return response.data
}

export const updateBoardDetailsAPI = async(boardId, updateData) => {
  const response = await asiox.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async(updateData) => {
  const response = await asiox.put(`${API_ROOT}/v1/boards/supports/movingCard`, updateData)
  return response.data
}

export const deleteBoardAPI = async(boardId) => {
  const response = await asiox.post(`${API_ROOT}/v1/boards/delete`, boardId)
  return response.data
}
// end board



// Column
export const createNewColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async(columnId, updateData) => {
  const response = await asiox.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async(columnId) => {
  const response = await asiox.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// end column


// Card
export const createNewCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const addMemberCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/addMember`, data)
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

export const addTaskCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/addTask`, data)
  return response.data
}

// end card

// user 

export const loginApi = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users/login`, userData)
  return response.data
}

export const registerApi = async (userData) => {
  const response = await axios.post(`${API_ROOT}/v1/users`, userData)
  return response.data
}

export const getUser = async () => {
  const response = await axios.get(`${API_ROOT}/v1/users/getUser`,{
    withCredentials: true
  })
  return response.data
}

export const updateUser = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/update`, data,{
    withCredentials: true
  })
  return response.data
}

export const updatePasswordAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/updatePassword`, data,{
    withCredentials: true
  })
  return response.data
}

export const addStarreddAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/addStarred`, data,{
    withCredentials: true
  })
  return response.data
}

export const removeStarreddAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/users/removeStarred`, data,{
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


// end upload image


// Workspace 

export const addMemberAPI = async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/workspaces/addMember`,data)
  return response.data
}

export const removeMemberAPI = async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/workspaces/removeMember`,data)
  return response.data
}

export const createNewWorkspaceAPI = async(workspaceData) => {
  const response = await asiox.post(`${API_ROOT}/v1/workspaces/createWorkspace`, workspaceData)
  return response.data
}

export const updateWorkspaceAPI = async(newData) => {
  const response = await asiox.post(`${API_ROOT}/v1/workspaces/update`, newData)
  return response.data
}

export const deleteWorkspaceAPI = async(id) => {
  const response = await asiox.post(`${API_ROOT}/v1/workspaces/delete`, id)
  return response.data
}

// end workspace

// start comments
export const addCommentAPI = async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/comments/postComment`,data)
  return response.data
}

// end comments

// send email
export const sendEmailAPI= async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/email/sendEmail`,data)
  return response.data
}
//

// start code recover
export const findCodeRecoverAPI= async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/codeRecover/getOne`,data)
  return response.data
}

export const createCodeRecoverAPI= async(data) => {
  const response = await asiox.post(`${API_ROOT}/v1/codeRecover/create`,data)
  return response.data
}
// end code recover