// src/context/FazendaProvider.tsx
import React, { useState, type ReactNode } from 'react'
import { FazendaContext, type FazendaData } from './FazendaContext'

interface Props { children: ReactNode }

export const FazendaProvider: React.FC<Props> = ({ children }) => {
  const [fazendas, setFazendas] = useState<FazendaData[]>([])
  const [nextId, setNextId] = useState(1)

  const addFazenda = (f: Omit<FazendaData, 'id' | 'dataCadastro'>) => {
    const nova: FazendaData = {
      ...f,
      id: nextId,
      dataCadastro: new Date(),
    }
    setFazendas(prev => [...prev, nova])
    setNextId(prev => prev + 1)
  }

  const deleteFazenda = (id: number) => {
    setFazendas(prev => prev.filter(f => f.id !== id))
  }

  const updateFazenda = (updated: FazendaData) => {
    setFazendas(prev =>
      prev.map(f => (f.id === updated.id ? updated : f))
    )
  }

  return (
    <FazendaContext.Provider
      value={{ fazendas, nextId, addFazenda, deleteFazenda, updateFazenda }}
    >
      {children}
    </FazendaContext.Provider>
  )
}
