<script setup>
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps(['onChange', 'length', 'hasError'])

const inp1 = ref(null)
const inputValues = ref([])

const handleInput = (event) => {
  let currentActiveElement = event.target
  if (event.target.value) {
    currentActiveElement.nextElementSibling?.focus()
  }
  const id = event.target.dataset.id
  inputValues.value[id] = event.target.value
  props.onChange(inputValues.value.join(''))
  console.log(inputValues.value)
}

onMounted(() => {
  inp1.value.focus();
  console.log(props)
});
</script>

<template>
  <div :class='["confirmationCode__container", hasError && "confirmationCode__container_error"]'>
    <input data-id="0" ref='inp1' class='confirmationCode__input' @input='handleInput' maxLength='1' />
    <template v-if='props.length > 1'>
      <input v-for='num of Number(props.length - 1)' :key='num' :data-id="num" class='confirmationCode__input'
        @input='handleInput' maxLength='1' />
    </template>
    <!-- <input data-id="1" class='confirmationCode__input' @input='handleInput' maxLength='1' />
    <input data-id="2" class='confirmationCode__input' @input='handleInput' maxLength='1' />
    <input data-id="3" class='confirmationCode__input' @input='handleInput' maxLength='1' /> -->
  </div>
</template>

<style>
.confirmationCode__container {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.confirmationCode__container_error input {
  border: 1px solid crimson;
}

.confirmationCode__input {
  width: 54px;
  height: 64px;
  padding: 20px;
  border-radius: 12px;
  background-color: #F4F4F4;
  color: #212121;
  border: none;
  font-size: 24px;
}
</style>