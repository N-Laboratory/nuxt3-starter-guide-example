<script lang="ts" setup>
interface Props {
  modelValue: string
}
interface Emits {
  (e: 'update:modelValue', newValue: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const value = computed({
  get(): string {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    v-model="value"
    type="text"
  >
</template>

<style scoped></style>
