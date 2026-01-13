import { useContext } from 'react'
import { DespesasContext } from './DespesasContext'
import type { DespesasContextType } from './DespesasContext'

export const useDespesas = (): DespesasContextType => {
  const ctx = useContext(DespesasContext)
  if (!ctx) {
    throw new Error(
      'useDespesas precisa estar dentro de um DespesasProvider'
    )
  }
  return ctx
}
