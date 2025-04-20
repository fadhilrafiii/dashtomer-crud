<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import AppInput from './AppInput.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    debounce?: number
    size?: 'small' | 'medium'
  }>(),
  {
    debounce: 300,
  },
)

const emit = defineEmits(['update:modelValue'])

const timeout = ref<ReturnType<typeof setTimeout>>()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    if (timeout.value) {
      clearTimeout(timeout.value)
    }
    timeout.value = setTimeout(() => emit('update:modelValue', newValue), props.debounce)
  },
})
onBeforeUnmount(() => clearTimeout(timeout.value))
</script>

<template>
  <AppInput v-model="localValue" :size="size" v-bind="$attrs" />
</template>
