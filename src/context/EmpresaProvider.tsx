// src/context/EmpresaProvider.tsx

import React, { useState, type ReactNode } from 'react'
import {
  EmpresaContext,
  type EmpresaData,
  type EmpresaContextValue,
} from './EmpresaContext'

interface EmpresaProviderProps {
  children: ReactNode
}

export function EmpresaProvider({ children }: EmpresaProviderProps) {
  const [empresas, setEmpresas] = useState<EmpresaData[]>([])

  const createEmpresa = (e: EmpresaData) =>
    setEmpresas(prev => [...prev, e])
  const updateEmpresa = (e: EmpresaData) =>
    setEmpresas(prev => prev.map(x => (x.id === e.id ? e : x)))
  const deleteEmpresa = (id: number) =>
    setEmpresas(prev => prev.filter(x => x.id !== id))

  const value: EmpresaContextValue = {
    empresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
  }

  return (
    <EmpresaContext.Provider value={value}>
      {children}
    </EmpresaContext.Provider>
  )
}
