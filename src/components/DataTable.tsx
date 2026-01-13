// src/components/DataTable.tsx

import { useState, useMemo } from 'react'
import {
  Table, Thead, Tbody, Tr, Th, Td,
  Input, IconButton,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import type { ColumnDef } from '../types'

interface Props<T extends object> {
  columns: ColumnDef<T>[]
  data: T[]
  onEdit: (row: T) => void
  onDelete: (row: T) => void
}

export function DataTable<T extends object>({
  columns,
  data,
  onEdit,
  onDelete,
}: Props<T>) {
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({})

  // Aplica filtros “contains”
  const filtered = useMemo(() => {
    return data.filter(row =>
      columns.every(col => {
        if (!col.filterable) return true
        const query = filters[col.accessor]?.toLowerCase() ?? ''
        const cell  = String(row[col.accessor] ?? '').toLowerCase()
        return cell.includes(query)
      })
    )
  }, [data, columns, filters])

  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          {columns.map(col => (
            <Th key={String(col.accessor)}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{col.Header}</span>
                {col.filterable && (
                  <Input
                    size="xs"
                    mt={1}
                    placeholder="Filtrar"
                    value={filters[col.accessor] ?? ''}
                    onChange={e =>
                      setFilters(f => ({
                        ...f,
                        [col.accessor]: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
            </Th>
          ))}
          <Th>Ações</Th>
        </Tr>
      </Thead>

      <Tbody>
        {filtered.map((row, idx) => (
          <Tr key={idx}>
            {columns.map(col => (
              <Td key={String(col.accessor)}>
                {col.Cell
                  ? col.Cell(row[col.accessor], row)
                  : String(row[col.accessor] ?? '')}
              </Td>
            ))}
            <Td>
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                size="sm"
                mr={2}
                onClick={() => onEdit(row)}
              />
              <IconButton
                aria-label="Excluir"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(row)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
