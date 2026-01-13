// src/pages/empresas/ListarEmpresas.tsx

import React, { useState, useMemo } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { ListTemplate } from '../components/ListTemplate'
import { useEmpresa } from '../context/EmpresaContext'
import type { EmpresaData } from '../context/EmpresaContext'
import type { ColumnDef } from '../types'

import IDField from '../components/form/empresa/IDField'
import NomeField from '../components/form/empresa/NomeField'
import EmailField from '../components/form/empresa/EmailField'
import TelefoneEmpresaField from '../components/form/empresa/TelefoneEmpresaField'
import CidadeField from '../components/form/empresa/CidadeField'
import VendedorField from '../components/form/empresa/VendedorField'
import TelefoneVendedorField from '../components/form/empresa/TelefoneVendedorField'

export default function ListarEmpresas() {
  const { empresas, deleteEmpresa, updateEmpresa } = useEmpresa()
  const toast = useToast()

  // ── Ordenação ───────────────────────────────────────────────
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EmpresaData | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const handleSort = (col: keyof EmpresaData) => {
    setSortConfig(prev => {
      if (prev.key !== col) return { key: col, direction: 'asc' }
      if (prev.direction === 'asc') return { key: col, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }

  const sortedEmpresas = useMemo(() => {
    const { key, direction } = sortConfig
    if (key === null) return empresas

    return [...empresas].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      const aNum = typeof aVal === 'number' ? aVal : Number(aVal)
      const bNum = typeof bVal === 'number' ? bVal : Number(bVal)
      return direction === 'asc' ? aNum - bNum : bNum - aNum
    })
  }, [empresas, sortConfig])

  // ── Definição das colunas ────────────────────────────────────
  const columns: ColumnDef<EmpresaData>[] = [
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
        <Button variant="ghost" size="xs" onClick={() => handleSort('nome')}>
          Nome {sortConfig.key === 'nome' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'nome',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('email')}>
          E-mail {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'email',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('telefoneEmpresa')}>
          Telefone Empresa {sortConfig.key === 'telefoneEmpresa'
            ? sortConfig.direction === 'asc' ? '↑' : '↓'
            : ''}
        </Button>
      ),
      accessor: 'telefoneEmpresa',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('cidade')}>
          Cidade {sortConfig.key === 'cidade' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'cidade',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('vendedor')}>
          Vendedor {sortConfig.key === 'vendedor' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'vendedor',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('telefoneVendedor')}>
          Telefone Vendedor {sortConfig.key === 'telefoneVendedor'
            ? sortConfig.direction === 'asc' ? '↑' : '↓'
            : ''}
        </Button>
      ),
      accessor: 'telefoneVendedor',
      filterable: true,
    },
  ]

  // ── JSX dos campos para o modal de edição ───────────────────
  const EmpresaFormFields: React.FC = () => (
    <>
      <IDField isDisabled />
      <NomeField />
      <EmailField />
      <TelefoneEmpresaField />
      <CidadeField />
      <VendedorField />
      <TelefoneVendedorField />
    </>
  )

  return (
    <ListTemplate<EmpresaData>
      data={sortedEmpresas}
      columns={columns}
      pageSize={10}
      onDelete={row => {
        deleteEmpresa(row.id)
        toast({ title: `Empresa #${row.id} removida`, status: 'info', duration: 2000 })
      }}
      onSave={item => {
        updateEmpresa(item)
        toast({ title: `Empresa #${item.id} atualizada`, status: 'success', duration: 2000 })
      }}
      FormFields={EmpresaFormFields}
    />
  )
}
