<script setup lang="ts" generic="T">
import { ref, toRef, watch } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  getFilteredRowModel,
  type ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/vue-table'
import ChevronLeftIcon from './icons/ChevronLeftIcon.vue'
import AppTableColumnFilter from './AppTableColumnFilter.vue'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'

interface Props<T> {
  columns: ColumnDef<T>[]
  data: T[]
  pagination?: boolean
  pageSize?: number
  sortable?: boolean
}

const props = withDefaults(defineProps<Props<T>>(), {
  pagination: false,
  pageSize: 10,
  sortable: false,
})

const router = useRouter()
const route = useRoute()

const initialFilters = Object.entries(route.query).map(([key, value]) => ({
  id: key,
  value: value as string,
}))
const columnFilters = ref<ColumnFiltersState>(initialFilters)

const syncSearchParams = () => {
  const qp: Record<string, unknown> = {}
  const currentQuery = { ...route.query }
  columnFilters.value.forEach((filter: { id: string; value: unknown }) => {
    qp[filter.id] = filter.value as string
  })
  Object.keys(currentQuery).forEach((key: string) => {
    if (!qp[key]) delete currentQuery[key]
  })

  router.push({
    query: {
      ...currentQuery,
      ...(qp as LocationQueryRaw),
    },
  })
}

const data = ref<T[]>(props.data)
watch(toRef(props, 'data'), (newVal: T[]) => {
  data.value = [...newVal]
})

const table = useVueTable({
  get data() {
    return data.value as T[]
  },
  state: {
    get columnFilters() {
      return columnFilters.value
    },
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue

    syncSearchParams()
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getSortedRowModel: getSortedRowModel(),
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: props.pageSize,
    },
  },
})

const toggleSort = (columnId: string) => {
  if (!props.sortable) return
  const column = table.getColumn(columnId)
  column?.toggleSorting()
}

const nextPage = () => {
  if (table.getCanNextPage()) {
    table.nextPage()
  }
}

const previousPage = () => {
  if (table.getCanPreviousPage()) {
    table.previousPage()
  }
}

const goToPage = (pageIndex: number) => {
  table.setPageIndex(pageIndex)
}
</script>

<template>
  <div class="w-full">
    <div class="w-full overflow-x-auto relative rounded-lg">
      <table class="min-w-full border-collapse table-fixed">
        <thead>
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="px-4 py-3 text-left bg-slate-100 border border-slate-200 whitespace-nowrap"
              :class="[
                props.sortable && header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                header.column.columnDef.meta?.headerClass ?? '',
                header.index === 0 ? 'first:rounded-tl-lg' : '',
                header.index === headerGroup.headers.length - 1 ? 'last:rounded-tr-lg' : '',
              ]"
            >
              <div class="flex items-center justify-between gap-2 font-semibold">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                <span
                  v-if="props.sortable && header.column.getCanSort()"
                  role="button"
                  aria-label="sort"
                  @click="
                    props.sortable && header.column.getCanSort()
                      ? toggleSort(header.column.id)
                      : null
                  "
                >
                  {{ { asc: '▲', desc: '▼', false: '⇅' }[String(header.column.getIsSorted())] }}
                </span>
              </div>
              <div
                class="font-normal"
                v-if="!!header.column.columnDef.meta?.filter && header.column.getCanFilter()"
              >
                <AppTableColumnFilter
                  :type="header.column.columnDef.meta.filter"
                  :column="header.column"
                  :table="table"
                  :options="header.column.columnDef.meta.filterOptions"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in table.getRowModel().rows"
            :key="row.id"
            class="hover:bg-slate-50"
          >
            <td
              v-for="(cell, cellIndex) in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-2 border border-slate-200 bg-white whitespace-nowrap"
              :class="[
                cell.column.columnDef.meta?.cellClass ?? '',
                {
                  'rounded-bl-lg':
                    rowIndex === table.getRowModel().rows.length - 1 && cellIndex === 0,
                  'rounded-br-lg':
                    rowIndex === table.getRowModel().rows.length - 1 &&
                    cellIndex === row.getVisibleCells().length - 1,
                },
              ]"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td
              :colspan="table.getAllColumns().length"
              class="px-4 py-8 text-center text-slate-500 border border-slate-200"
            >
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="props.pagination && table.getPageCount() > 1"
      class="flex items-center justify-between pt-4 gap-4 flex-wrap-reverse"
    >
      <div class="text-sm text-slate-700">
        Page {{ table.getState().pagination?.pageIndex + 1 }} of {{ table.getPageCount() }}
      </div>

      <div class="flex items-center gap-2">
        <button
          class="p-2 rounded border border-slate-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          :disabled="!table.getCanPreviousPage()"
          @click="previousPage"
        >
          <ChevronLeftIcon :size="14" color="#000" />
        </button>

        <button
          v-for="page in table.getPageCount()"
          :key="page"
          class="w-8 h-8 flex items-center justify-center rounded text-sm cursor-pointer"
          :class="
            (table.getState().pagination?.pageIndex || 0) === page - 1
              ? 'bg-primary text-white'
              : 'border border-slate-300'
          "
          @click="goToPage(page - 1)"
        >
          {{ page }}
        </button>

        <button
          class="p-2 rounded border border-slate-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          :disabled="!table.getCanNextPage()"
          @click="nextPage"
        >
          <ChevronLeftIcon :size="14" color="#000" class="rotate-180" />
        </button>
      </div>
    </div>
  </div>
</template>
