<script setup>
import { defineProps, defineModel } from 'vue'
// ['class', 'placeholder', 'type']
const props = defineProps({
  class: String,
  placeholder: String,
  type: {
    default: 'text',
    type: String,
  },
})
const value = defineModel()
</script>

<template>
  <input :type='props.type' :class="['input', props.class]" :placeholder="props.placeholder" :v-model='value' />
</template>

<style scoped>
.input {
  border-radius: 12px;
  padding: 14px 16px;
  background-color: #F8F8F8;
  border: none;
  font-size: 16px;
}

.input::placeholder {
  color: #767676;
}
</style>