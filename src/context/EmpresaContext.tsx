import { createContext, useContext } from 'react'

/** Tipo dos dados de uma empresa */
export interface EmpresaData {
  id: number
  nome: string
  email: string
  telefoneEmpresa: string
  cidade: string
  vendedor: string
  telefoneVendedor: string
}

/** Funções e dados que o contexto fornece */
export interface EmpresaContextValue {
  empresas: EmpresaData[]
  createEmpresa: (e: EmpresaData) => void
  updateEmpresa: (e: EmpresaData) => void
  deleteEmpresa: (id: number) => void
}

/** Contexto em si, inicialmente undefined */
export const EmpresaContext = createContext<EmpresaContextValue | undefined>(undefined)

/** Hook de acesso seguro ao contexto */
export function useEmpresa(): EmpresaContextValue {
  const ctx = useContext(EmpresaContext)
  if (!ctx) {
    throw new Error('useEmpresa must be used within an EmpresaProvider')
  }
  return ctx
}
