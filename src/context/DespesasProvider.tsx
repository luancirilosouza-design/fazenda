// src/context/DespesasProvider.tsx

import React, { useState, type ReactNode } from 'react'
import {
  DespesasContext,
  type DespesasContextType,
  type DespesaData,
} from './DespesasContext'

interface DespesasProviderProps {
  children: ReactNode
}

export function DespesasProvider({ children }: DespesasProviderProps) {
  const [despesas, setDespesas] = useState<DespesaData[]>([])

  const nextId =
    despesas.length > 0
      ? Math.max(...despesas.map((d) => d.id)) + 1
      : 1

  const addDespesa = (data: DespesaData) => {
    setDespesas((prev) => [...prev, data])
  }

  const updateDespesa = (updated: DespesaData) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    )
  }

  const deleteDespesa = (id: number) => {
    setDespesas((prev) => prev.filter((d) => d.id !== id))
  }

  const value: DespesasContextType = {
    despesas,
    nextId,
    addDespesa,
    updateDespesa,
    deleteDespesa,
  }

  return (
    <DespesasContext.Provider value={value}>
      {children}
    </DespesasContext.Provider>
  )
}
