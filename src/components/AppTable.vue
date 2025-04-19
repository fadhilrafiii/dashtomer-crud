<script setup lang="ts" generic="T">
import { reactive } from 'vue'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

interface Props {
  columns: ColumnDef<T>[]
  data: T[]
}

const props = defineProps<Props>()

const tableOptions = reactive<TableOptions<Document>>({
  get data() {
    return props.data
  },
  getCoreRowModel: getCoreRowModel(),
  get columns() {
    return props.columns
  },
})

const table = useVueTable(tableOptions)
</script>
<template>
  <table class="w-full border-separate rounded-lg overflow-hidden border-spacing-0 drop-shadow-md">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
          class="px-4 py-3 border border-slate-200 bg-slate-100 first:rounded-tl-lg last:rounded-tr-lg font-semibold"
        >
          <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in table.getRowModel().rows" :key="row.id">
        <td
          v-for="(cell, cellIndex) in row.getVisibleCells()"
          :key="cell.id"
          :class="{
            'rounded-bl-lg': index === table.getRowModel().rows.length - 1 && cellIndex === 0, // Bottom-left cell
            'rounded-br-lg':
              index === table.getRowModel().rows.length - 1 &&
              cellIndex === row.getVisibleCells().length - 1, // Bottom-right cell
            [cell.column.columnDef.cellClass]: true,
          }"
          class="px-4 py-2 border border-slate-200 bg-white"
        >
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
