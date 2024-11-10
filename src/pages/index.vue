<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const text = ref('')
const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <h1 data-testid="page-title">
      Pages/index.vue
    </h1>
    <BaseTextInput
      v-model="text"
      data-testid="text-input"
    />
    <p>Input value = {{ text }}</p>
    <input
      type="submit"
      value="Get uuid"
      @click="handleClick"
    >
    <p>UUID = {{ uuid }}</p>
  </div>
</template>

<style scoped></style>
