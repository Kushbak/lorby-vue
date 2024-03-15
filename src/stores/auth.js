import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api'
import { ERROR_MESSAGES } from '@/const'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const loginError = ref()
  const registerErrors = ref({})

  const login = async (payload) => {
    isLoading.value = true
    loginError.value = ''
    try {
      const data = await authApi.login(payload)
      return data
    } catch (e) {
      loginError.value = ERROR_MESSAGES[e.response.data.error]
    } finally {
      isLoading.value = false
    }
  }

  const register = async (payload) => {
    isLoading.value = true
    registerErrors.value = {}
    try {
      const data = await authApi.register(payload)
      return data
    } catch (e) {
      registerErrors.value = e.response.data.error
    } finally {
      isLoading.value = false
    }
  }

  return { login, register, isLoading, loginError, registerErrors }
})
