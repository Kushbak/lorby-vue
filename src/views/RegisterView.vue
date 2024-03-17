<script setup>
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import PasswordError from '@/components/PasswordError.vue'
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import router from '@/router'

const authStore = useAuthStore()

const state = reactive({
  email: '',
  username: '',
  password: '',
  password_confirm: '',
})

const rules = {
  email: { email, required }, // Matches state.firstName
  username: { required }, // Matches state.lastName
  password: {
    required,
    lengthError: (value) => value.length >= 8 && value.length <= 15,
    caseSenseError: (value) => /[A-Z]/.test(value) && /[a-z]/.test(value),
    hasIntegerError: (value) => /\d/.test(value),
    hasSymbolError: (value) => /[!@#$%^&*]/.test(value)
  },
  password_confirm: {
    required,
    samePassword: helpers.withMessage('This field cannot be not same as password field', (value) => value === state.password)
  },
}

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const result = await v$.value.$validate()
  if (!result) return
  await authStore.register(state)
  router.push('/confirm_code')
}

const disabled = computed(() => {

  console.log(v$.value)
  const isFieldsEmpty = v$.value.$invalid || authStore.isLoading
  return isFieldsEmpty
})

</script>

<template>
  <AuthLayout>
    <RouterLink to='/login' :class='["link", "link__container"]'>
      <img src='../assets/img/arrow-left.svg' />
      Назад
    </RouterLink>
    <div class='auth__contentContainer'>
      <h3 class='title'>Создать аккаунт Lorby</h3>
      <form class='form' @submit.prevent='onSubmit'>
        <InputComponent v-model='v$.email.$model' type='email' placeholder='Введи адрес почты' />
        <p class='error' v-if='authStore.registerErrors.email?.length'>{{
      authStore.registerErrors.email?.join('<br />') }}</p>
        <p class='error' v-if='v$.email.$errors[0]?.$message'>{{ v$.email.$errors[0]?.$message }}</p>
        <InputComponent v-model='v$.username.$model' placeholder='Придумай логин' />
        <p class='error' v-if='authStore.registerErrors.username?.length'>{{
      authStore.registerErrors.username?.join('<br />') }}</p>
        <p class='error' v-if='v$.username.$errors[0]?.$message'>{{ v$.username.$errors[0]?.$message }}</p>
        <InputComponent v-model='v$.password.$model' placeholder='Создай пароль' type='password' />
        <PasswordError :value='state.password' :hasError='v$.password.lengthError.$invalid'>
          От 8 до 15 символов
        </PasswordError>
        <PasswordError :value='state.password' :hasError='v$.password.caseSenseError.$invalid'>
          Строчные и прописные буквы
        </PasswordError>
        <PasswordError :value='state.password' :hasError='v$.password.hasIntegerError.$invalid'>
          Минимум 1 цифра
        </PasswordError>
        <PasswordError :value='state.password' :hasError='v$.password.hasSymbolError.$invalid'>
          Минимум 1 спецсимвол (!, ", #, $...)
        </PasswordError>

        <InputComponent v-model='v$.password_confirm.$model' placeholder='Повтори пароль' type='password' />
        <p class='error' v-if='authStore.registerErrors.password_confirm?.length'>{{
      authStore.registerErrors.password_confirm?.join('<br />') }}</p>
        <p class='error' v-if='v$.password_confirm.$errors[0]?.$message'>{{
      v$.password_confirm.$errors[0]?.$message }}</p>
        <ButtonComponent :disabled>{{ authStore.isLoading ? 'Загрузка...' : 'Далее' }}</ButtonComponent>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped>
.link__container {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 40px;
}
</style>