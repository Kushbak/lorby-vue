<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class='app__container'>
    <RouterView />
  </div>
</template>

<style scoped>
.app__container {
  max-height: 100vh;
  height: 100%;
}
</style>
