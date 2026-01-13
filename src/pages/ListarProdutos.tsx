// src/pages/produtos/ListarProdutos.tsx

import React, { useState, useMemo } from 'react'
import { Button, useToast, Link } from '@chakra-ui/react'
import { ListTemplate } from '../components/ListTemplate'
import { useProduto } from '../context/ProdutoContext'
import type { ProductData } from '../context/ProdutoContext'
import type { ColumnDef } from '../types'

// componentes de formulário para o modal de edição
import IDField from '../components/form/produto/IDField'
import NomeProdutoField from '../components/form/produto/NomeProdutoField'
import IngredienteAtivoField from '../components/form/produto/IngredienteAtivoField'
import CategoriaField from '../components/form/produto/CategoriaField'
import ImagemProdutoField from '../components/form/produto/ImagemProdutoField'
import EmpresaField from '../components/form/produto/EmpresaField'
import ObservacoesField from '../components/form/produto/ObservacoesField'

export default function ListarProdutos() {
  const { produtos, deleteProduto, updateProduto } = useProduto()
  const toast = useToast()

  // ── Ordenação ───────────────────────────────────────────────
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ProductData | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const handleSort = (col: keyof ProductData) => {
    setSortConfig(prev => {
      if (prev.key !== col) return { key: col, direction: 'asc' }
      if (prev.direction === 'asc') return { key: col, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }

  const sortedProdutos = useMemo(() => {
    const { key, direction } = sortConfig
    if (!key) return produtos

    return [...produtos].sort((a, b) => {
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
  }, [produtos, sortConfig])

  // ── Definição das colunas ────────────────────────────────────
  const columns: ColumnDef<ProductData>[] = [
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
        <Button variant="ghost" size="xs" onClick={() => handleSort('ingredienteAtivo')}>
          Ingrediente Ativo{' '}
          {sortConfig.key === 'ingredienteAtivo'
            ? sortConfig.direction === 'asc'
              ? '↑'
              : '↓'
            : ''}
        </Button>
      ),
      accessor: 'ingredienteAtivo',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('categoria')}>
          Categoria {sortConfig.key === 'categoria' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'categoria',
      filterable: true,
    },
    {
      Header: (
        <Button variant="ghost" size="xs" onClick={() => handleSort('empresa')}>
          Empresa {sortConfig.key === 'empresa' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
        </Button>
      ),
      accessor: 'empresa',
      filterable: true,
    },
    {
      Header: 'Imagem',
      accessor: 'imagemProduto',
      filterable: false,
      Cell: (value: ProductData['imagemProduto']): React.ReactNode => (
  <>
    {value.map((file, idx) => {
      const url = URL.createObjectURL(file);
      return (
        <Link
          key={idx}
          href={url}
          isExternal
          color="teal.500"
          mr={2}
        >
          {file.name}
        </Link>
      );
    })}
  </>
),
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
  ]

  // ── JSX dos campos para o modal de edição ───────────────────
  const ProdutoFormFields: React.FC = () => (
    <>
      <IDField isDisabled />
      <NomeProdutoField />
      <IngredienteAtivoField />
      <CategoriaField />
      <ImagemProdutoField />
      <EmpresaField />
      <ObservacoesField />
    </>
  )

  return (
    <ListTemplate<ProductData>
      data={sortedProdutos}
      columns={columns}
      pageSize={10}
      onDelete={row => {
        deleteProduto(row.id)
        toast({ title: `Produto #${row.id} removido`, status: 'info', duration: 2000 })
      }}
      onSave={item => {
        updateProduto(item)
        toast({ title: `Produto #${item.id} atualizado`, status: 'success', duration: 2000 })
      }}
      FormFields={ProdutoFormFields}
    />
  )
}
