// src/types/index.ts
import type { ReactNode } from 'react'

/**
 * Para cada propriedade K de T, criamos uma variante de ColumnDef
 * que garante que, se accessor === K, então Cell receberá T[K].
 */
export type ColumnDef<T> = {
  [K in keyof T]: {
    Header: ReactNode            // aceita string, Element, fragment, etc.
    accessor: K
    filterable?: boolean
    Cell?: (value: T[K], row: T) => ReactNode
  }
}[keyof T]
