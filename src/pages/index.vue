<script lang="ts" setup>
import BaseTextInput from '../components/atoms/BaseTextInput.vue'

const text = ref('')
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
  </div>
</template>

<style scoped></style>
