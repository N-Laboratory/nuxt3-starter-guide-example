<script lang="ts" setup>
import BaseTextInput from '../components/atoms/BaseTextInput.vue'
const text = ref('')
</script>

<template>
  <div>
    <h1>Pages/index.vue</h1>
    <BaseTextInput v-model="text" />
    <p>Input value = {{ text }}</p>
  </div>
</template>

<style scoped></style>
