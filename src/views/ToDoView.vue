<script setup lang="ts">
import { h } from 'vue'
import { uuid } from 'vue-uuid'
import type { ColumnDef, CellContext } from '@tanstack/vue-table'

import AppTable from '@/components/AppTable.vue'
import ToDoFilter from '@/components/ToDoFilter.vue'
import ToDoStatusTag from '@/components/ToDoStatusTag.vue'
import ToDoPriorityTag from '@/components/ToDoPriorityTag.vue'
import ToDoTableAction from '@/components/ToDoTableAction.vue'
import { ToDoPriority, ToDoStatus, type ToDo } from '@/types/todo'

const columns: ColumnDef<ToDo>[] = [
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
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info: CellContext<ToDo, Date>) => {
      const date = info.getValue()
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    },
  },
  {
    header: 'Action',
    cell: (info: CellContext<ToDo, unknown>) => {
      const todo = info.row.original
      return h(ToDoTableAction, { todo })
    },
    meta: {
      sticky: 'right',
      width: '100px',
      cellClass: 'text-center',
    },
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
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <h1 class="text-xl lg:text-3xl font-semibold">To Do</h1>
    </div>
    <ToDoFilter />
    <div>
      <AppTable :columns="columns" :data="data" sortable pagination />
    </div>
  </div>
</template>
