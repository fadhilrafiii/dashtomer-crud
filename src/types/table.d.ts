// src/types/table.d.ts
import '@tanstack/vue-table'

// Extend the ColumnDef interface to include custom properties like `cellClass` and `meta.sticky`
declare module '@tanstack/vue-table' {
  interface ColumnMeta {
    width?: string
    sticky?: 'right' | 'left'
    cellClass?: string
    headerClass?: string
    filter?: 'search' | 'select'
    filterOptions?: { label: string; value: string }[]
  }
}
