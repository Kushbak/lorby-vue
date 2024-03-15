<script setup>

</script>

<template>
  <div class='auth__container'>
    <div class='auth__preview'>
      <img src='../assets/img/lorby-preview.png' />
      <h2>Lorby</h2>
      <p>Твой личный репетитор</p>
    </div>
    <div class='auth__content'>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth__container {
  display: flex;
  height: 100%;
}

.auth__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 50%;
}

.auth__content {
  flex-basis: 50%;
}
</style>
