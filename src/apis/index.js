import axios from 'axios'
import asiox from 'axios'
import { API_ROOT } from '~/utils/constants'

// Tim hieu them interceptors

// Board
export const fetchBoardDetailsAPI = async(boardId) => {
  const response = await asiox.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

// Column
export const createNewColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}


// Card
export const createNewCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}