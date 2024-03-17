<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
</script>

<template>
  <main>
    Home
    <button @click="authStore.logout" class='link'>Logout</button>
  </main>
</template>
