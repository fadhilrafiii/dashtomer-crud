<script setup lang="ts">
import { h } from 'vue'
import { uuid } from 'vue-uuid'
import _AppTable from '@/components/AppTable.vue'
import ToDoFilter from '@/components/ToDoFilter.vue'
import ToDoStatusTag from '@/components/ToDoStatusTag.vue'
import ToDoPriorityTag from '@/components/ToDoPriorityTag.vue'
import ToDoTableAction from '@/components/ToDoTableAction.vue'
import { ToDoPriority, ToDoStatus } from '@/types/todo'

const columns: ColumnDef<ToDo>[] = [
  {
    header: 'No',
    accessorFn: (_, idx: number) => idx + 1,
    cellClass: 'text-center',
  },
  {
    accessorKey: 'name',
    header: 'Task Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: (info) => {
      const priority = info.getValue()
      return h(ToDoPriorityTag, { priority }) // Render ToDoPriorityTag component with priority prop
    },
    cellClass: 'text-center',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue()
      return h(ToDoStatusTag, { status })
    },
    cellClass: 'text-center',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info) => {
      const date = info.getValue() as Date
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    },
  },
  {
    header: 'Action',
    cell: (info) => {
      return h(ToDoTableAction, { id: info.row.id })
    },
    cellClass: 'text-center',
  },
]
const data: ToDo[] = [
  {
    id: uuid.v4(),
    name: 'Implement login form',
    priority: ToDoPriority.High,
    status: ToDoStatus.InProgress,
    createdAt: new Date('2025-04-01'),
  },
  {
    id: uuid.v4(),
    name: 'Fix navbar responsiveness',
    priority: ToDoPriority.Medium,
    status: ToDoStatus.ToDo,
    createdAt: new Date('2025-04-15'),
  },
  {
    id: uuid.v4(),
    name: 'Refactor user settings page',
    priority: ToDoPriority.Low,
    status: ToDoStatus.Done,
    createdAt: new Date('2025-03-28'),
  },
  {
    id: uuid.v4(),
    name: 'Design analytics dashboard',
    priority: ToDoPriority.High,
    status: ToDoStatus.ToDo,
    createdAt: new Date('2025-04-18'),
  },
  {
    id: uuid.v4(),
    name: 'Write unit tests for ToDo service',
    priority: ToDoPriority.Medium,
    status: ToDoStatus.InProgress,
    createdAt: new Date('2025-04-10'),
  },
]

const AppTable = _AppTable as new () => typeof _AppTable<ToDo>
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-xl lg:text-3xl font-semibold">To Do</h1>
    <ToDoFilter />
    <div>
      <AppTable :columns="columns" :data="data" />
    </div>
  </div>
</template>
