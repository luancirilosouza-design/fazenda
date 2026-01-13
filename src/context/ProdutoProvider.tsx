// src/context/ProdutoProvider.tsx

import React, { useState } from 'react'
import type { ReactNode } from 'react'
import {
  ProdutoContext,
  type ProductData,
  type ProdutoContextValue,
} from './ProdutoContext'

interface Props {
  children: ReactNode
}

export function ProdutoProvider({ children }: Props) {
  const [produtos, setProdutos] = useState<ProductData[]>([])

  const createProduto = (p: ProductData) =>
    setProdutos(prev => [...prev, p])

  const updateProduto = (p: ProductData) =>
    setProdutos(prev => prev.map(x => (x.id === p.id ? p : x)))

  const deleteProduto = (id: number) =>
    setProdutos(prev => prev.filter(x => x.id !== id))

  const value: ProdutoContextValue = {
    produtos,
    createProduto,
    updateProduto,
    deleteProduto,
  }

  return (
    <ProdutoContext.Provider value={value}>
      {children}
    </ProdutoContext.Provider>
  )
}
