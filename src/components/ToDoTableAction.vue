<script setup lang="ts">
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import type { ToDo } from '@/types/todo'

defineProps<{ todo: ToDo }>()
const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()
</script>
<template>
  <div class="flex justify-center items-center gap-x-2">
    <EditIcon
      :size="20"
      color="#305cde"
      role="button"
      aria-label="edit"
      class="cursor-pointer w-7 h-7 p-1 rounded-full hover:bg-blue-50"
      @click="() => emit('edit')"
    />
    <DeleteIcon
      :size="20"
      color="#c10007"
      role="button"
      aria-label="delete"
      class="cursor-pointer w-7 h-7 p-1 rounded-full hover:bg-red-50"
      @click="() => emit('delete')"
    />
  </div>
</template>
