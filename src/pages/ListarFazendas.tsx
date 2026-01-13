// src/pages/fazendas/ListarFazendas.tsx

import React, { useState, useMemo } from 'react'
import { Button, Link, useToast } from '@chakra-ui/react'
import { ListTemplate } from '../components/ListTemplate'
import { useFazenda } from '../context/useFazenda'
import type { FazendaData } from '../context/FazendaContext'
import type { ColumnDef } from '../types'

import IDField from '../components/form/fazenda/IDField'
import NomeField from '../components/form/fazenda/NomeField'
import NumeroCarEstadualField from '../components/form/fazenda/NumeroCarEstadualField'
import IEField from '../components/form/fazenda/IEField'
import CEPField from '../components/form/fazenda/CEPField'
import AreaTotalField from '../components/form/fazenda/AreaTotalField'
import AreaPlantadaField from '../components/form/fazenda/AreaPlantadaField'
import MapaFazendaField from '../components/form/fazenda/MapaFazendaField'
import ObservacoesField from '../components/form/fazenda/ObservacoesField'

export default function ListarFazendas() {
  const { fazendas, deleteFazenda, updateFazenda } = useFazenda()
  const toast = useToast()

  // estado de ordenação
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FazendaData | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const handleSort = (col: keyof FazendaData) => {
    setSortConfig(prev => {
      if (prev.key !== col) return { key: col, direction: 'asc' }
      if (prev.direction === 'asc') return { key: col, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }

  // *** Aqui: geramos o array já ordenado antes de passar ao ListTemplate
  const sortedFazendas = useMemo(() => {
  const { key, direction } = sortConfig
  if (key === null) return fazendas

  return [...fazendas].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    const aNum = aVal instanceof Date ? aVal.getTime() : Number(aVal)
    const bNum = bVal instanceof Date ? bVal.getTime() : Number(bVal)
    return direction === 'asc' ? aNum - bNum : bNum - aNum
  })
}, [fazendas, sortConfig])

  // definição de colunas com headers clicáveis
  const columns: ColumnDef<FazendaData>[] = [
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
        <Button variant="ghost" size="xs" onClick={() => handleSort('numeroCarEstadual')}>
          CAR Estadual {sortConfig.key === 'numeroCarEstadual'
            ? sortConfig.direction === 'asc'
              ? '↑'
              : '↓'
            : ''}
        </Button>
      ),
      accessor: 'numeroCarEstadual',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('ie')}>
          I.E. {sortConfig.key === 'ie' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'ie',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('cep')}>
          CEP {sortConfig.key === 'cep' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'cep',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('areaTotal')}>
          Área Total {sortConfig.key === 'areaTotal'
            ? sortConfig.direction === 'asc'
              ? '↑'
              : '↓'
            : ''}
        </Button>
      ),
      accessor: 'areaTotal',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('areaPlantada')}>
          Área Plantada {sortConfig.key === 'areaPlantada'
            ? sortConfig.direction === 'asc'
              ? '↑'
              : '↓'
            : ''}
        </Button>
      ),
      accessor: 'areaPlantada',
      filterable: true,
    },
    {
      Header: 'Mapa',
      accessor: 'mapaDaFazenda',
      Cell: (files: File[]) => (
        <>
          {files.map((f, i) => (
            <Link href={URL.createObjectURL(f)} isExternal key={i} mr="2">
              {f.name}
            </Link>
          ))}
        </>
      ),
    },
    { Header: 'Observações', accessor: 'observacoes', filterable: true },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('dataCadastro')}>
          Data Cadastro {sortConfig.key === 'dataCadastro'
            ? sortConfig.direction === 'asc'
              ? '↑'
              : '↓'
            : ''}
        </Button>
      ),
      accessor: 'dataCadastro',
      filterable: true,
      Cell: (date: Date) => date.toLocaleDateString(),
    },
  ]

  // agrupa todos os campos que vão no modal
  const FazendaFormFields: React.FC = () => (
    <>
      <IDField isDisabled />
      <NomeField />
      <NumeroCarEstadualField />
      <IEField />
      <CEPField />
      <AreaTotalField />
      <AreaPlantadaField />
      <MapaFazendaField />
      <ObservacoesField />
    </>
  )

  return (
    <ListTemplate<FazendaData>
      data={sortedFazendas}            // <-- aqui passamos o array ordenado
      columns={columns}
      pageSize={10}
      onDelete={f => {
        deleteFazenda(f.id)
        toast({ title: `#${f.id} removida`, status: 'info', duration: 2000 })
      }}
      onSave={item => {
        updateFazenda(item)
        toast({ title: `#${item.id} atualizada`, status: 'success', duration: 2000 })
      }}
      FormFields={FazendaFormFields}
    />
  )
}
