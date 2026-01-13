import React, { createContext } from 'react'
import type { MaquinarioData } from './maquinarioTypes'

interface MaquinarioContextType {
  maquinarios: MaquinarioData[]
  addMaquinario: (data: MaquinarioData) => void
  updateMaquinario: (data: MaquinarioData) => void
  deleteMaquinario: (id: number) => void
}

export const MaquinarioContext = createContext<MaquinarioContextType>({} as any)
