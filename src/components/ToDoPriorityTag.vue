<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { ToDoPriority, TO_DO_PRIORITY_LABEL } from '@/types/todo'

const props = defineProps<{
  priority: ToDoPriority
}>()

// Compute the label based on the priority
const priorityLabel = computed(() => TO_DO_PRIORITY_LABEL[props.priority])

// Compute the class based on the priority for styling
const priorityClass = computed(() => {
  switch (props.priority) {
    case ToDoPriority.Low:
      return 'bg-green-200 text-green-700' // "Low" priority color
    case ToDoPriority.Medium:
      return 'bg-amber-200 text-amber-700' // "Medium" priority color
    case ToDoPriority.High:
      return 'bg-red-200 text-red-700' // "High" priority color
    default:
      return 'bg-gray-200 text-gray-700' // Default color
  }
})
</script>

<template>
  <span :class="priorityClass" class="px-4 py-2 rounded-full text-sm font-medium drop-shadow-sm">
    {{ priorityLabel }}
  </span>
</template>
