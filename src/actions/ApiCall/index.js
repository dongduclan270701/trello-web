import axios from 'axios'
import { API_ROOT } from 'utils/constants'

export const fetchBoardDetails = async (id) => {
    const req = await axios.post(`${API_ROOT}/v1/boards/${id}`)
    return req.data
}