export interface MaquinarioData {
  id: number
  fazenda: string
  codigoIdentificacao: string
  marca: string
  modelo: string
  ano: number
  placa: string
  condicao: string
  propriedade: string
  contratos: File[]
  horasTrabalhadas: string
  dataVerificacao: string
  imagens: File[]
  observacoes: string
}
