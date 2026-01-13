import React, { useState, useMemo } from 'react'
import { Button, useToast, Link } from '@chakra-ui/react'
import { ListTemplate } from '../components/ListTemplate'
import { useEstoque } from '../context/useEstoque'
import type { EstoqueData } from '../context/estoqueTypes'
import type { ColumnDef } from '../types'

import IDField from '../components/form/estoque/IDField'
import FazendaField from '../components/form/estoque/FazendaField'
import CulturaField from '../components/form/estoque/CulturaField'
import ProdutoField from '../components/form/estoque/ProdutoField'
import QuantidadeField from '../components/form/estoque/QuantidadeField'
import UnidadeField from '../components/form/estoque/UnidadeField'
import DoseField from '../components/form/estoque/DoseField'
import ValorField from '../components/form/estoque/ValorField'
import SafraField from '../components/form/estoque/SafraField'
import DataSafraField from '../components/form/estoque/DataSafraField'
import DataVencimentoField from '../components/form/estoque/DataVencimentoField'
import TrocaField from '../components/form/estoque/TrocaField'
import NumeroPedidoField from '../components/form/estoque/NumeroPedidoField'
import PedidoField from '../components/form/estoque/PedidoField'
import NumeroCPRField from '../components/form/estoque/NumeroCPRField'
import ComprovanteField from '../components/form/estoque/ComprovanteField'
import ObservacoesField from '../components/form/estoque/ObservacoesField'
export default function ListarEstoque() {
  const { estoques, deleteEstoque, updateEstoque } = useEstoque()
  const toast = useToast()

  const [sortConfig, setSortConfig] = useState<{
    key: keyof EstoqueData | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const handleSort = (col: keyof EstoqueData) => {
    setSortConfig(prev => {
      if (prev.key !== col) return { key: col, direction: 'asc' }
      if (prev.direction === 'asc') return { key: col, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }
  const sortedEstoques = useMemo(() => {
    const { key, direction } = sortConfig
    if (key === null) return estoques
    return [...estoques].sort((a, b) => {
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
  }, [estoques, sortConfig])
  const columns: ColumnDef<EstoqueData>[] = [
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
      <Button variant="ghost" size="xs" onClick={() => handleSort('produtos')}>
        Produtos {sortConfig.key === 'produtos' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'produtos',
    filterable: true,
    Cell: (value: string[] = []) => value.join(', '),
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('cultura')}>
        Cultura {sortConfig.key === 'cultura' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'cultura',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('safra')}>
        Safra {sortConfig.key === 'safra' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'safra',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('dataSafra')}>
        Data Safra {sortConfig.key === 'dataSafra' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'dataSafra',
    filterable: true,
    Cell: (value: string | undefined) => {
      if (!value) return '—'
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('dataVencimento')}>
        Data Vencimento {sortConfig.key === 'dataVencimento' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'dataVencimento',
    filterable: true,
    Cell: (value: string | undefined) => {
      if (!value) return '—'
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('quantidade')}>
        Quantidade {sortConfig.key === 'quantidade' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'quantidade',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('unidade')}>
        Unidade {sortConfig.key === 'unidade' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'unidade',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('dose')}>
        Dose {sortConfig.key === 'dose' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'dose',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('valor')}>
        Valor {sortConfig.key === 'valor' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'valor',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('troca')}>
        Troca {sortConfig.key === 'troca' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'troca',
    filterable: true,
  },
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('numeroPedido')}>
        Número Pedido {sortConfig.key === 'numeroPedido' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'numeroPedido',
    filterable: true,
  },
  {
  Header: 'Pedidos',
  accessor: 'pedidos',
  filterable: true,
  Cell: (value?: File[]) => {
    const files = value || []
    const handleRemove = (index: number) => {
      files.splice(index, 1)
    }
    return (
      <>
        {files.map((f, i) => (
          <span key={i} style={{ marginRight: 8 }}>
            <Link href={URL.createObjectURL(f)} isExternal color="teal.500" mr={1}>
              {f.name}
            </Link>
            <Button size="xs" colorScheme="red" onClick={() => handleRemove(i)}>
              ❌
            </Button>
          </span>
        ))}
      </>
    )
  },
},
  {
    Header: (
      <Button variant="ghost" size="xs" onClick={() => handleSort('numeroCPR')}>
        Número CPR {sortConfig.key === 'numeroCPR' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
      </Button>
    ),
    accessor: 'numeroCPR',
    filterable: true,
  },
  {
  Header: 'Comprovantes',
  accessor: 'comprovantes',
  filterable: true,
  Cell: (value?: File[], row?: EstoqueData) => {
    const files = value || []
    const handleRemove = (index: number) => {
      const updatedFiles = [...files]
      updatedFiles.splice(index, 1)
      if (row) {
        row.comprovantes = updatedFiles
      }
    }
    return (
      <>
        {files.map((f, i) => (
          <span key={i} style={{ marginRight: 8 }}>
            <Link href={URL.createObjectURL(f)} isExternal color="teal.500" mr={1}>
              {f.name}
            </Link>
            <Button size="xs" colorScheme="red" onClick={() => handleRemove(i)}>
              ❌
            </Button>
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
]
  const EstoqueFormFields: React.FC = () => (
    <>
      <IDField isDisabled />
      <FazendaField />
      <ProdutoField />
      <CulturaField />
      <SafraField />
      <DataSafraField />
      <DataVencimentoField />
      <QuantidadeField />
      <UnidadeField />
      <DoseField />
      <ValorField />
      <TrocaField />
      <NumeroPedidoField />
      <PedidoField />
      <NumeroCPRField />
      <ComprovanteField />
      <ObservacoesField />
    </>
  )
  return (
    <ListTemplate<EstoqueData>
      data={sortedEstoques}
      columns={columns}
      pageSize={10}
      onDelete={e => {
        deleteEstoque(e.id)
        toast({ title: `#${e.id} removido`, status: 'info', duration: 2000 })
      }}
      onSave={item => {
        updateEstoque(item)
        toast({ title: `#${item.id} atualizado`, status: 'success', duration: 2000 })
      }}
      FormFields={EstoqueFormFields}
    />
  )
}
