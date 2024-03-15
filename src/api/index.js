import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const authApi = {
  login: async (data) => {
    const response = await instance.post('login/', data)
    return response.data
  },
  register: async (data) => {
    const response = await instance.post('register/', data)
    return response.data
  }
}
