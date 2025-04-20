<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import type { ColumnDef, CellContext } from '@tanstack/vue-table'

import AppButton from '@/components/AppButton.vue'
import AppTable from '@/components/AppTable.vue'
import ToDoStatusTag from '@/components/ToDoStatusTag.vue'
import ToDoPriorityTag from '@/components/ToDoPriorityTag.vue'
import ToDoTableAction from '@/components/ToDoTableAction.vue'
import {
  LOCAL_STORAGE_TODO,
  TO_DO_PRIORITY_LABEL,
  TO_DO_STATUS_LABEL,
  ToDoPriority,
  ToDoStatus,
  type ToDo,
} from '@/types/todo'
import ToDoFormModal from '@/components/ToDoFormModal.vue'
import ToDoDeleteConfirmModal from '@/components/ToDoDeleteConfirmModal.vue'

const toDoPriorities = Object.keys(TO_DO_PRIORITY_LABEL).map((prio: string | ToDoPriority) => ({
  label: TO_DO_PRIORITY_LABEL[prio as ToDoPriority],
  value: prio as ToDoPriority,
}))

const toDoStatuses = Object.keys(TO_DO_STATUS_LABEL).map((status: string | ToDoStatus) => ({
  label: TO_DO_STATUS_LABEL[status as ToDoStatus],
  value: status as ToDoStatus,
}))

const data = ref<ToDo[]>([])

const isFormModalOpen = ref(false)
const handleToggleFormModal = () => {
  isFormModalOpen.value = !isFormModalOpen.value
}

const isDeleteModalOpen = ref(false)
const deleteId = ref<string>()
const handleToggleDeleteModal = (id?: string) => {
  if (!isDeleteModalOpen.value) deleteId.value = id
  isDeleteModalOpen.value = !isDeleteModalOpen.value
}

const editId = ref<string>()

const createToDo = (todo: ToDo) => {
  data.value = [todo, ...data.value]
  localStorage.setItem(LOCAL_STORAGE_TODO, JSON.stringify(data.value))
}

const editToDo = (id: string, newToDo: ToDo) => {
  data.value = data.value.map((todo: ToDo) =>
    todo.id === id ? { ...newToDo, createdAt: todo.createdAt } : todo,
  )
  localStorage.setItem(LOCAL_STORAGE_TODO, JSON.stringify(data.value))
}

const handleSubmit = (payload: ToDo) => {
  if (editId.value) {
    editToDo(editId.value, payload)
    editId.value = undefined
    handleToggleFormModal()
  } else {
    createToDo(payload)
  }
}

const deleteToDo = (id: string) => {
  data.value = data.value.filter((todo: ToDo) => todo.id !== id)
  localStorage.setItem(LOCAL_STORAGE_TODO, JSON.stringify(data.value))
}

const columns = [
  {
    header: 'No',
    accessorFn: (_: ToDo, idx: number) => idx + 1,
    meta: {
      cellClass: 'text-center',
    },
  },
  {
    accessorKey: 'name',
    header: 'Task Name',
    meta: {
      filter: 'search',
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: (info: CellContext<ToDo, ToDoPriority>) => {
      const priority = info.getValue()
      return h(ToDoPriorityTag, { priority })
    },
    meta: {
      cellClass: 'text-center',
      filter: 'select',
      filterOptions: toDoPriorities,
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info: CellContext<ToDo, ToDoStatus>) => {
      const status = info.getValue()
      return h(ToDoStatusTag, { status })
    },
    meta: {
      cellClass: 'text-center',
      filter: 'select',
      filterOptions: toDoStatuses,
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info: CellContext<ToDo, string>) => {
      const date = info.getValue()
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(date))
    },
  },
  {
    header: 'Action',
    cell: (info: CellContext<ToDo, unknown>) => {
      const todo = info.row.original
      return h(ToDoTableAction, {
        todo,
        onDelete: () => handleToggleDeleteModal(info.row.original.id),
        onEdit: () => {
          editId.value = info.row.original.id
          handleToggleFormModal()
        },
      })
    },
    meta: {
      sticky: 'right',
      width: '100px',
      cellClass: 'text-center',
    },
  },
] as ColumnDef<ToDo>[]

onMounted(() => {
  try {
    const initialTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO) || '[]')
    data.value = [...initialTodos]
  } catch (error) {
    console.error(error)
    data.value = []
  }
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <h1 class="text-xl lg:text-3xl font-semibold">To Do</h1>
      <AppButton @click="handleToggleFormModal">
        <template #content> + New To Do</template>
      </AppButton>
    </div>
    <AppTable :columns="columns" :data="data" sortable pagination />
    <ToDoFormModal
      :is-open="isFormModalOpen"
      :initial-data="data.find((todo: ToDo) => todo.id === editId)"
      @close="handleToggleFormModal"
      @submit="handleSubmit"
    />
    <ToDoDeleteConfirmModal
      :is-open="isDeleteModalOpen"
      :todo="data.find((todo: ToDo) => todo.id === deleteId)"
      @close="handleToggleDeleteModal"
      @confirm="deleteToDo"
    />
  </div>
</template>
