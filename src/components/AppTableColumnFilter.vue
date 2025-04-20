<script lang="ts" setup generic="T">
import type { Column, Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import AppDebouncedInput from './AppDebouncedInput.vue'
import AppSelect from './AppSelect.vue'
import { type OptionValue } from '@/types/common'

const props = withDefaults(
  defineProps<{
    column: Column<T>
    table: Table<T>
    type: 'search' | 'select'
    options?: { label: string; value: string | number }[]
  }>(),
  {
    type: 'search',
  },
)

const columnFilterValue = computed(() => props.column.getFilterValue())
</script>

<template>
  <AppSelect
    v-if="type === 'select'"
    :modelValue="columnFilterValue as OptionValue"
    @update:modelValue="(value) => column.setFilterValue(value)"
    :options="options as Record<string, unknown>[]"
    placeholder="Select..."
    track-by="value"
    label-key="label"
    size="small"
  />
  <AppDebouncedInput
    v-else
    type="text"
    :modelValue="columnFilterValue as string"
    @update:modelValue="(value) => column.setFilterValue(value)"
    placeholder="Search..."
    class="w-full"
    size="small"
  />
</template>
