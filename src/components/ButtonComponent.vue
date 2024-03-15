<script setup>
import { defineProps } from 'vue'

const props = defineProps(['class', 'disabled'])

</script>

<template>
  <button :class="['button', props.class]" :disabled='disabled'>
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  border-radius: 12px;
  padding: 13px 16px;
  background-color: #292929;
  color: #F8F8F8;
  border: none;
  font-size: 16px;
}

.button:disabled {
  background-color: #D7D7D7;
  color: #767676;
  cursor: not-allowed;
}
</style>