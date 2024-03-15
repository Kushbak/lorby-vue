<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const username = ref()
const password = ref()

const onSubmit = () => {
  console.log({ username: username.value, password: password.value })
  authStore.handleLogin({ username: username.value, password: password.value })
}
</script>

<template>
  <AuthLayout>
    <div class='login'>
      <h3 class='title'>Вэлком бэк!</h3>
      <form class='login__form' @submit.prevent='onSubmit'>
        <InputComponent :value='username' placeholder='Введите логин' />
        <InputComponent :value='password' placeholder='Введите пароль' type='password' />
        {{ authStore.error }}
        <ButtonComponent class='login__submit' :disabled='authStore.isLoading'>{{ authStore.isLoading ? 'Вход...' :
        'Войти' }}</ButtonComponent>
        <RouterLink to='/register'>У меня еще нет аккаунта</RouterLink>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped>
.title {
  font-size: 32px;
  margin-bottom: 48px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 380px;
  width: 100%;
}

.login__submit {
  margin: 38px 0;
}
</style>