<script setup lang="ts">
import AppModal from './AppModal.vue'
import type { ToDo } from '@/types/todo'
import AppButton from './AppButton.vue'

interface Props {
  isOpen: boolean
  todo?: ToDo
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', id: string): void
}>()

const handleConfirm = () => {
  if (props.todo?.id) emit('confirm', props.todo?.id)

  emit('close')
}
</script>
<template>
  <AppModal :is-open="isOpen" @close="() => emit('close')">
    <template #title> Delete To Do </template>
    <template #content>
      <div class="flex flex-col gap-4 lg:gap-6">
        <div>Are you sure to delete "{{ todo?.name }}" ?</div>
        <AppButton class="bg-red-400 hover:bg-red-700" @click="handleConfirm">
          <template #content>Delete</template>
        </AppButton>
      </div></template
    >
  </AppModal>
</template>
