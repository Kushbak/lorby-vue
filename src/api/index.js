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
  },
  sendConfirmCode: async (data) => {
    const response = await instance.post('email-confirm/', data)
    return response
  },
  resendConfirmCode: async (data) => {
    const response = await instance.post('resend-confirmation-code/', data)
    return response
  }
}
