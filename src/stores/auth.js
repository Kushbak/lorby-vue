import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api'
import { ERROR_MESSAGES } from '@/const'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const error = ref()

  const handleLogin = async (payload) => {
    isLoading.value = true
    try {
      const data = await login(payload)
      console.log({ data })
      return data
    } catch (e) {
      error.value = ERROR_MESSAGES[e.response.data.error]
      console.log(e.response.data, error.value)
    } finally {
      isLoading.value = false
    }
  }
  console.log({ isLoading: isLoading.value, error: error.value })
  return { handleLogin, isLoading, error }
})
