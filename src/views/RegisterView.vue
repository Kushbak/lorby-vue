<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const username = ref('')
const password = ref('')
const passwordConfirm = ref('')

const onSubmit = () => {
  const payload = { email: email.value, username: username.value, password: password.value, password_confirm: passwordConfirm.value }
  authStore.register(payload)
}

const disabled = computed(() => {
  const isFieldsEmpty = !(email.value && username.value && password.value && passwordConfirm.value)
  return isFieldsEmpty
})

</script>

<template>
  <AuthLayout>
    <RouterLink to='/login'>Назад</RouterLink>
    <div class='auth__contentContainer'>
      <h3 class='title'>Создать аккаунт Lorby</h3>
      <form class='form' @submit.prevent='onSubmit'>
        <InputComponent v-model='email' type='email' placeholder='Введи адрес почты' />
        {{ authStore.registerErrors.email?.join('<br />') }}
        <InputComponent v-model='username' placeholder='Придумай логин' />
        {{ authStore.registerErrors.username?.join('<br />') }}
        <InputComponent v-model='password' placeholder='Создай пароль' />
        {{ authStore.registerErrors.password?.join('<br />') }}
        <InputComponent v-model='passwordConfirm' placeholder='Повтори пароль' />
        {{ authStore.registerErrors.password_confirm?.join('<br />') }}
        <ButtonComponent class='form__submit' :disabled='disabled'>Далее</ButtonComponent>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>