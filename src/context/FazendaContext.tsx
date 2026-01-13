// src/context/FazendaContext.ts
import { createContext } from 'react'

export interface FazendaData {
  id: number
  fazenda: string
}

export interface FazendaContextType {
  fazendas: FazendaData[]
  nextId: number

  // ← aqui a grande mudança:
  // omitimos 'id' e 'dataCadastro'
  addFazenda: (f: Omit<FazendaData, 'id' | 'dataCadastro'>) => void

  deleteFazenda: (id: number) => void
  updateFazenda: (updated: FazendaData) => void
}

// valor padrão só pra não quebrar se alguém usar fora do Provider
export const defaultContext: FazendaContextType = {
  fazendas: [],
  nextId: 1,
  addFazenda: () => {},    // agora recebe só os campos do form
  deleteFazenda: () => {},
  updateFazenda: () => {},
}

export const FazendaContext = createContext<FazendaContextType>(defaultContext)
