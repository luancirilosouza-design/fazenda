// src/context/FuncionarioContext.tsx
import React, { createContext } from 'react'
import type { FuncionarioData } from './funcionarioTypes'

interface FuncionarioContextType {
  funcionarios: FuncionarioData[]
  addFuncionario: (data: FuncionarioData) => void
  updateFuncionario: (data: FuncionarioData) => void
  deleteFuncionario: (id: number) => void
}

export const FuncionarioContext = createContext<FuncionarioContextType>({} as any)
