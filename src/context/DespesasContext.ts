// src/context/DespesasContext.ts

import { createContext, useContext } from 'react'

// Tipos compartilhados
export type DespesaData = {
  id: number
  fazenda: string
  comprador: string
  tipoDespesa: string
  pagamentoEmGrao: boolean
  quantidadeGrao: string
  formaPagamento: 'avista' | 'parcelado'
  quantidadeParcelas: number
  valoresParcelas: string[] // cada valor como string para aceitar R$, texto, etc.
  parcelasPagas?: boolean[] // ✅ novo campo
  comprovantesParcelas?: string[][] // ✅ novo campo
  valorDespesa: string
  enviarParaDashboard: boolean
  formaPagamentoDetalhado: 'pix' | 'boleto' | 'transferencia'
  chavePix?: string
  anexosBoleto?: string[] // nomes dos arquivos
  banco?: string
  agencia?: string
  conta?: string
  comprovantesPagamento?: string[]
  notaFiscal?: string[]
  observacoes?: string
}

export interface DespesasContextType {
  despesas: DespesaData[]
  nextId: number
  addDespesa: (d: DespesaData) => void
  updateDespesa: (d: DespesaData) => void
  deleteDespesa: (id: number) => void
}

// Cria o contexto (sem provider aqui)
export const DespesasContext =
  createContext<DespesasContextType | undefined>(undefined)

// Hook para consumir o contexto
export function useDespesas(): DespesasContextType {
  const context = useContext(DespesasContext)
  if (!context) {
    throw new Error(
      'useDespesas deve ser usado dentro de um DespesasProvider'
    )
  }
  return context
}
