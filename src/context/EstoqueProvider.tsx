import { useState } from 'react'
import type { ReactNode } from 'react'
import { EstoqueContext } from './EstoqueContext'
import type { EstoqueData } from './estoqueTypes'

export const EstoqueProvider = ({ children }: { children: ReactNode }) => {
  const [estoques, setEstoques] = useState<EstoqueData[]>([])

  const addEstoque = (novo: EstoqueData) => {
    setEstoques(prev => [...prev, novo])
  }

  const updateEstoque = (atualizado: EstoqueData) => {
    setEstoques(prev =>
      prev.map(e => (e.id === atualizado.id ? atualizado : e))
    )
  }

  const deleteEstoque = (id: number) => {
    setEstoques(prev => prev.filter(e => e.id !== id))
  }

  return (
    <EstoqueContext.Provider value={{ estoques, addEstoque, updateEstoque, deleteEstoque }}>
      {children}
    </EstoqueContext.Provider>
  )
}
