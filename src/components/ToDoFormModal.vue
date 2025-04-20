<script setup lang="ts">
import { reactive, toRef, watch, watchEffect } from 'vue'
import AppInput from './AppInput.vue'
import AppModal from './AppModal.vue'
import {
  TO_DO_PRIORITY_LABEL,
  TO_DO_STATUS_LABEL,
  type ToDo,
  type ToDoForm,
  ToDoPriority,
  ToDoStatus,
} from '@/types/todo'
import AppSelect from './AppSelect.vue'
import { uuid } from 'vue-uuid'
import AppButton from './AppButton.vue'

interface Props {
  isOpen: boolean
  initialData?: ToDo
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: ToDo): void
}>()

const form = reactive<ToDoForm>({
  name: '',
  priority: null,
  status: null,
})
// For edit
watch(toRef(props, 'initialData'), () => {
  if (!props.initialData) return

  form.name = props.initialData.name
  form.priority = props.initialData.priority
  form.status = props.initialData.status
})

const errorForm = reactive<Record<string, string>>({
  name: '',
  priority: '',
  status: '',
})

const toDoPriorities = Object.keys(TO_DO_PRIORITY_LABEL).map((prio: string | ToDoPriority) => ({
  label: TO_DO_PRIORITY_LABEL[prio as ToDoPriority],
  value: prio as ToDoPriority,
}))

const toDoStatuses = Object.keys(TO_DO_STATUS_LABEL).map((status: string | ToDoStatus) => ({
  label: TO_DO_STATUS_LABEL[status as ToDoStatus],
  value: status as ToDoStatus,
}))

watchEffect(() => {
  Object.keys(form).forEach((key: string) => {
    if (!!errorForm[key] && form[key as keyof ToDoForm]) {
      errorForm[key] = ''
    }
  })
})

const validateForm = (key?: string) => {
  if (!key) {
    const errorKeys = Object.keys(form).filter((key: string) => !form[key as keyof ToDoForm])
    errorKeys.forEach((key: string) => {
      errorForm[key] = 'Please fill the required field.'
    })

    return errorKeys.length === 0
  } else {
    const val = form[key as keyof ToDoForm]
    errorForm[key] = 'Please fill the required field.'

    return !!val
  }
}

const resetForm = () => {
  form.name = ''
  form.priority = null
  form.status = null

  errorForm.name = ''
  errorForm.priority = ''
  errorForm.status = ''
}

const handleSubmit = () => {
  const isValid = validateForm()
  console.log('handleSubmit', isValid)
  if (!isValid) return

  emit('submit', {
    name: form.name,
    status: form.status as ToDoStatus,
    priority: form.priority as ToDoPriority,
    id: uuid.v4(),
    createdAt: new Date().toUTCString(),
  })
  console.log('test')
  resetForm()
}
</script>

<template>
  <AppModal :is-open="props.isOpen" @close="() => emit('close')">
    <template #title>To Do Form <span v-if="!!initialData">(Edit)</span></template>
    <template #content>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <AppInput
          v-model="form.name"
          label="Task Name"
          placeholder="Type your task name"
          :error="errorForm.name"
        />
        <AppSelect
          v-model="form.priority"
          :options="toDoPriorities"
          label="Select Priority"
          placeholder="Choose a priority"
          :error="errorForm.priority"
          track-by="value"
          label-key="label"
        />
        <AppSelect
          v-model="form.status"
          :options="toDoStatuses"
          label="Select Status"
          placeholder="Choose a Status"
          :error="errorForm.status"
          track-by="value"
          label-key="label"
        />
        <AppButton type="submit">
          <template #content>Submit</template>
        </AppButton>
      </form>
    </template>
  </AppModal>
</template>
