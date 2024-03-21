import axios from 'axios'
import asiox from 'axios'
import { API_ROOT } from '~/utils/constants'

// Tim hieu them interceptors

// Board
export const fetchBoardDetailsAPI = async(boardId) => {
  const response = await asiox.get(`${API_ROOT}/v1/boards/${boardId}`)
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


// end card