import axios from 'axios'
import { API_ROOT } from 'utils/constants'

export const fetchBoardDetails = async (id) => {
    const req = await axios.get(`${API_ROOT}/v1/boards/${id}`)
    return req.data
}

export const createNewColumn = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/columns`, data)
    return req.data
}

export const updateColumn = async (id, data) => {
    const req = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)
    return req.data
}

export const createNewCards = async (data) => {
    const req = await axios.post(`${API_ROOT}/v1/cards`, data)
    return req.data
}