<script setup>
import { defineProps } from 'vue'
const props = defineProps(['value', 'hasError'])
console.log({ props })
</script>

<template>
  <p :class='["passwordError", props.hasError ? "error" : "success", !props.value.length && "default"]'>
    - <slot></slot>
    {{ props.value.length && !props.hasError ? '✅' : '' }}
    {{ props.value.length && props.hasError ? '❌' : '' }}
  </p>
</template>

<style scoped>
.passwordError {
  position: relative;
  font-size: 12px;
}

.passwordError:before {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: 10px;
}

.default {
  color: #767676;
}

.default:before {
  background-color: #767676;
}

.success {
  color: #1BA228;
}

.success:before {
  background-color: #1BA228;
}
</style>