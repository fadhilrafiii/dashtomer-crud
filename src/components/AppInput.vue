<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const { label, modelValue, placeholder, type, id, error } = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  id?: string
  error?: string
  size?: 'small' | 'medium'
}>()

defineEmits(['update:modelValue'])
</script>
<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'px-3 border rounded-md outline-none transition bg-white focus:ring-2 focus:ring-primary',
        error ? 'border-red-600' : 'border-slate-300',
        size === 'small' ? 'py-1' : 'py-[11px]',
      ]"
    />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>
