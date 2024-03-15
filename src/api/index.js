import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const login = async (data) => {
  const response = await instance.post('login/', data)
  return response.data
}

export const register = async (data) => {
  const response = await instance.post('register/', data)
  return response.data
}
