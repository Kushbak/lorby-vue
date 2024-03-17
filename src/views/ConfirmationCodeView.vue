<script setup>
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue';
import ConfirmationCodeInput from '@/components/ConfirmationCodeInput.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const authStore = useAuthStore()

const input = ref()
const isBtnDisabled = ref(true)
const MAX_INPUT_LENGTH = 4
const tempEmail = localStorage.getItem('temp_item')

const onChange = (val) => {
  input.value = val
  isBtnDisabled.value = input.value.length !== MAX_INPUT_LENGTH
}

const onSubmit = async () => {
  await authStore.submitConfirmationCode(input.value)
  if (!authStore.error) {
    router.go('/login')
  }
}
</script>

<template>

  <AuthLayout>
    <RouterLink to='/login' :class='["link", "link__container"]'>
      <img src='../assets/img/arrow-left.svg' />
      Назад
    </RouterLink>

    <div class='auth__contentContainer'>
      <h3 class='title'>Введи 4-значный код, высланный на {{ tempEmail }}</h3>
      <form class='form' @submit.prevent='onSubmit'>
        <ConfirmationCodeInput :onChange='onChange' :length='MAX_INPUT_LENGTH' :hasError='authStore.error' />
        <p :class='["error", "form__error"]' v-if='authStore.error'>{{ authStore.error }}</p>
        <ButtonComponent class='form__submit' :disabled='isBtnDisabled'>Подтвердить</ButtonComponent>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped>
.title {
  font-size: 24px;
  text-align: center;
}

.link__container {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 40px;
}

.form__error {
  text-align: center;
  font-size: 16px;
}
</style>