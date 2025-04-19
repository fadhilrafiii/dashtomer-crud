<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { ToDoStatus, TO_DO_STATUS_LABEL } from '@/types/todo'

const props = defineProps<{
  status: ToDoStatus
}>()

// Compute the label based on the status
const statusLabel = computed(() => TO_DO_STATUS_LABEL[props.status])

// Compute the class based on the status for styling
const statusClass = computed(() => {
  switch (props.status) {
    case ToDoStatus.ToDo:
      return 'bg-blue-200 text-blue-700' // "To Do" color
    case ToDoStatus.InProgress:
      return 'bg-amber-200 text-amber-700' // "In Progress" color
    case ToDoStatus.Done:
      return 'bg-green-200 text-green-700' // "Done" color
    default:
      return 'bg-gray-200 text-gray-700' // Default color
  }
})
</script>

<template>
  <span :class="statusClass" class="px-4 py-2 rounded-full text-sm font-medium drop-shadow-sm">
    {{ statusLabel }}
  </span>
</template>
