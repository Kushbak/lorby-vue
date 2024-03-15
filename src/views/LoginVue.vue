<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const onSubmit = () => {
  authStore.login({ username: username.value, password: password.value })
}
</script>

<template>
  <AuthLayout>
    <div class='auth__contentContainer'>
      <h3 class='title'>Вэлком бэк!</h3>
      <form class='form' @submit.prevent='onSubmit'>
        <InputComponent v-model='username' placeholder='Введите логин' />
        <InputComponent v-model='password' placeholder='Введите пароль' type='password' />
        {{ authStore.loginError }}
        <ButtonComponent class='submit' :disabled='authStore.isLoading'>{{ authStore.isLoading ? 'Вход...' :
        'Войти' }}</ButtonComponent>
        <RouterLink to='/register'>У меня еще нет аккаунта</RouterLink>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>