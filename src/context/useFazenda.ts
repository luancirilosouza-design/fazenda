// src/context/useFazendas.ts

import { useContext } from 'react'
import { FazendaContext } from './FazendaContext'


export function useFazenda() {
  const context = useContext(FazendaContext)
  if (!context) {
    throw new Error('useFazenda deve ser usado dentro de um FazendaProvider')
  }
  return context
}

