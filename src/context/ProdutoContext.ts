// src/context/ProdutoContext.ts

import { createContext, useContext } from 'react'

export interface ProductData {
  id: number
  nome: string
  ingredienteAtivo: string
  categoria: string
  imagemProduto: File[]
  empresa: string
  observacoes: string
}

export interface ProdutoContextValue {
  produtos: ProductData[]
  createProduto: (p: ProductData) => void
  updateProduto: (p: ProductData) => void
  deleteProduto: (id: number) => void
}

export const ProdutoContext = createContext<ProdutoContextValue | undefined>(undefined)

export function useProduto(): ProdutoContextValue {
  const ctx = useContext(ProdutoContext)
  if (!ctx) throw new Error('useProduto must be used inside ProdutoProvider')
  return ctx
}
