<script setup>
import { RouterLink } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'

</script>

<template>
  <AuthLayout>
    <div class='register'>
      <h3>Register!</h3>
      <form>
        <input type="text">
        <input type="text">
        <button>Register</button>
        <RouterLink to='/login'>У меня еще нет аккаунта</RouterLink>
      </form>
    </div>
  </AuthLayout>
</template>

<style scoped></style>