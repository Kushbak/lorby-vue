<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const onSubmit = async () => {
  await authStore.login({ username: username.value, password: password.value })
  if (!authStore.error) {
    router.push('/')
  }
}
</script>

<template>
  <AuthLayout>
    <div class='auth__contentContainer'>
      <h3 class='title'>Вэлком бэк!</h3>
      <form class='form' @submit.prevent='onSubmit'>
        <InputComponent v-model='username' placeholder='Введите логин' />
        <InputComponent v-model='password' placeholder='Введите пароль' type='password' />
        <p class='error' v-if='authStore.error'>
          {{ authStore.error }}
        </p>
        <ButtonComponent class='form__submit' :disabled='authStore.isLoading'>{{ authStore.isLoading ? 'Вход...' :
        'Войти' }}</ButtonComponent>
        <p class='link__container'>
          <RouterLink to='/register' class='link'>У меня еще нет аккаунта</RouterLink>
        </p>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped>
.link__container {
  margin-top: 50px;
  text-align: center;
}
</style>