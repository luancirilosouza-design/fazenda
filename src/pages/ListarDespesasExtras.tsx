import React, { useState, useMemo } from 'react'
import {
  Button,
  useToast,
  Link,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ListTemplate } from '../components/ListTemplate'
import { useDespesas } from '../context/useDespesas'
import type { DespesaData } from '../context/DespesasContext'
import type { ColumnDef } from '../types'

import { FazendaField } from '../components/form/despesa/FazendaField'
import { CompradorField } from '../components/form/despesa/CompradorField'
import { TipoDespesaField } from '../components/form/despesa/TipoDespesaField'
import { PagamentoGraoField } from '../components/form/despesa/PagamentoGraoField'
import { FormaPagamentoField } from '../components/form/despesa/FormaPagamentoField'
import { FormaPagamentoDetalhadoField } from '../components/form/despesa/FormaPagamentoDetalhadoField'
import { ValorDespesaField } from '../components/form/despesa/ValorDespesaField'
import { ComprovantePagamentoField } from '../components/form/despesa/ComprovantePagamentoField'
import { NotaFiscalField } from '../components/form/despesa/NotaFiscalField'
import { ObservacoesField } from '../components/form/despesa/ObservacoesField'
import { PagamentoCell } from '../components/form/despesa/PagamentoCell'

export default function ListarDespesasExtras() {
  const { despesas, deleteDespesa, updateDespesa } = useDespesas()
  const toast = useToast()

  const [sortConfig, setSortConfig] = useState<{
    key: keyof DespesaData | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const handleSort = (col: keyof DespesaData) => {
    setSortConfig(prev => {
      if (prev.key !== col) return { key: col, direction: 'asc' }
      if (prev.direction === 'asc') return { key: col, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }

  const sortedDespesas = useMemo(() => {
    const { key, direction } = sortConfig
    if (key === null) return despesas
    return [...despesas].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      const aNum = aVal instanceof Date ? aVal.getTime() : Number(aVal ?? 0)
      const bNum = bVal instanceof Date ? bVal.getTime() : Number(bVal ?? 0)
      return direction === 'asc' ? aNum - bNum : bNum - aNum
    })
  }, [despesas, sortConfig])

  const columns: ColumnDef<DespesaData>[] = [
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('id')}>
          ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'id',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('fazenda')}>
          Fazenda {sortConfig.key === 'fazenda' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'fazenda',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('comprador')}>
          Comprador {sortConfig.key === 'comprador' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'comprador',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('tipoDespesa')}>
          Tipo {sortConfig.key === 'tipoDespesa' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'tipoDespesa',
      filterable: true,
    },
    {
      Header: 'Pagamento',
      accessor: 'formaPagamento',
      Cell: (value, row) => (
        <PagamentoCell value={value} row={row} updateDespesa={updateDespesa} />
      ),
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('valorDespesa')}>
          Valor {sortConfig.key === 'valorDespesa' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'valorDespesa',
      filterable: true,
    },
    {
      Header: 'Comprovantes',
      accessor: 'comprovantesPagamento',
      filterable: false,
      Cell: (value?: string[]) => {
        const files = value || []
        return (
          <>
            {files.map((name, i) => (
              <span key={i} style={{ marginRight: 8 }}>
                <Link href="#" color="teal.500" mr={1}>
                  {name}
                </Link>
              </span>
            ))}
          </>
        )
      },
    },
    {
      Header: 'Nota Fiscal',
      accessor: 'notaFiscal',
      filterable: false,
      Cell: (value?: string[]) => {
        const files = value || []
        return (
          <>
            {files.map((name, i) => (
              <span key={i} style={{ marginRight: 8 }}>
                <Link href="#" color="teal.500" mr={1}>
                  {name}
                </Link>
              </span>
            ))}
          </>
        )
      },
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('observacoes')}>
          Observações {sortConfig.key === 'observacoes' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'observacoes',
      filterable: true,
    },
    {
      Header: 'Ações',
      accessor: 'id',
      Cell: (_, row) => (
        <HStack>
          <IconButton
            icon={<EditIcon />}
            size="xs"
            aria-label="Editar"
            onClick={() => updateDespesa(row)}
          />
          <IconButton
            icon={<DeleteIcon />}
            size="xs"
            aria-label="Excluir"
            colorScheme="red"
            onClick={() => {
              deleteDespesa(row.id)
              toast({ title: `Despesa #${row.id} removida`, status: 'info', duration: 2000 })
            }}
          />
        </HStack>
      ),
    },
  ]

  const DespesaFormFields: React.FC = () => (
    <>
      <FazendaField />
      <CompradorField />
      <TipoDespesaField />
      <PagamentoGraoField />
      <FormaPagamentoField />
      <FormaPagamentoDetalhadoField />
      <ValorDespesaField />
      <ComprovantePagamentoField />
      <NotaFiscalField />
      <ObservacoesField />
    </>
  )

  return (
    <ListTemplate<DespesaData>
      data={sortedDespesas}
      columns={columns}
      pageSize={10}
      onDelete={e => {
        deleteDespesa(e.id)
        toast({ title: `#${e.id} removida`, status: 'info', duration: 2000 })
      }}
      onSave={item => {
        updateDespesa(item)
        toast({ title: `#${item.id} atualizada`, status: 'success', duration: 2000 })
      }}
      FormFields={DespesaFormFields}
    />
  )
}
