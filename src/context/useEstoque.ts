import { useContext } from 'react'
import { EstoqueContext } from './EstoqueContext'
import type { EstoqueContextType } from './estoqueTypes'

export const useEstoque = (): EstoqueContextType => {
  const context = useContext(EstoqueContext)
  if (!context) {
    throw new Error('useEstoque deve ser usado dentro de EstoqueProvider')
  }
  return context
}
