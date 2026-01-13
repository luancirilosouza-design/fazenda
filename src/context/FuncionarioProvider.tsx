// src/context/FuncionarioProvider.tsx
import React, { useState } from 'react'
import { FuncionarioContext } from './FuncionarioContext'
import type { FuncionarioData } from './funcionarioTypes'

export const FuncionarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [funcionarios, setFuncionarios] = useState<FuncionarioData[]>([])

  const addFuncionario = (data: FuncionarioData) => {
    setFuncionarios(prev => [...prev, data])
  }

  const updateFuncionario = (data: FuncionarioData) => {
    setFuncionarios(prev => prev.map(f => (f.id === data.id ? data : f)))
  }

  const deleteFuncionario = (id: number) => {
    setFuncionarios(prev => prev.filter(f => f.id !== id))
  }

  return (
    <FuncionarioContext.Provider
      value={{ funcionarios, addFuncionario, updateFuncionario, deleteFuncionario }}
    >
      {children}
    </FuncionarioContext.Provider>
  )
}
