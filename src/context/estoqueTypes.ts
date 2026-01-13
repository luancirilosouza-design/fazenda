export type EstoqueData = {
  id: number
  fazenda: string
  safra: string
  dataSafra: string
  cultura: string
  troca?: string
  produtos: string[]
  quantidade: number
  unidade: string
  dose: string
  valor: number
  numeroPedido?: string
  numeroCPR?: string
  dataVencimento?: string
  comprovantes?: File[]
  pedidos?: File[]
  observacoes?: string
  nome:string
}

export type EstoqueContextType = {
  estoques: EstoqueData[]
  addEstoque: (novo: EstoqueData) => void
  updateEstoque: (atualizado: EstoqueData) => void
  deleteEstoque: (id: number) => void
}
