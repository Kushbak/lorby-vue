import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api'
import { ERROR_MESSAGES } from '@/const'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const error = ref()
  const registerErrors = ref({})

  const login = async (payload) => {
    isLoading.value = true
    error.value = ''
    try {
      const data = await authApi.login(payload)
      return data
    } catch (e) {
      error.value = ERROR_MESSAGES[e.response.data.error]
    } finally {
      isLoading.value = false
    }
  }

  const register = async (payload) => {
    isLoading.value = true
    registerErrors.value = {}
    try {
      const data = await authApi.register(payload)
      localStorage.setItem('temp_email', payload.email)
      router.go('/confirm_code')
      return data
    } catch (e) {
      registerErrors.value = e.response.data.error
    } finally {
      isLoading.value = false
    }
  }

  const submitConfirmationCode = async (code) => {
    isLoading.value = true
    try {
      const data = await authApi.sendConfirmCode({ code })
      console.log(data)
    } catch (e) {
      error.value = e.response.data.error
    } finally {
      isLoading.value = false
    }
  }

  const resendConfirmationCode = async () => {
    isLoading.value = true
    try {
      const email = localStorage.getItem('temp_email')
      if (email) {
        await authApi.resendConfirmCode({ email })
        return
      }

      error.value = 'Something went wrong. Please try again later'
    } catch (e) {
      error.value = e.response.data.error
    } finally {
      isLoading.value = false
    }
  }

  return { login, register, submitConfirmationCode, resendConfirmationCode, isLoading, error, registerErrors }
})
