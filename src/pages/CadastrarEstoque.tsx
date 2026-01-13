import React, { useEffect } from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEstoque } from '../context/useEstoque'

import {
  IDField,
  FazendaField,
  SafraField,
  DataSafraField,
  CulturaField,
  TrocaField,
  ProdutoField,
  QuantidadeField,
  UnidadeField,
  DoseField,
  NumeroPedidoField,
  ValorField,
  NumeroCPRField,
  DataVencimentoField,
  ComprovanteField,
  PedidoField,
  ObservacoesField,
} from '../components/form/estoque'

type FormValues = {
  id: number
  fazenda: string
  safra: 'Safra' | 'Safrinha' | ''
  dataSafra: string
  cultura: string
  troca: 'Sim' | 'Não' | ''
  produtos: string[]
  quantidade: number
  unidade: 'Tonelada' | 'Litros' | 'Kg' | 'Sacas' | 'Bag'
  dose: string
  numeroPedido: string
  valor: number
  numeroCPR: string
  dataVencimento: string
  comprovantes: File[]
  pedidos: File[]
  observacoes: string
}

const CadastrarEstoque: React.FC = () => {
  const { addEstoque, estoques } = useEstoque()

  const nextId = estoques.length > 0 ? Math.max(...estoques.map(e => e.id)) + 1 : 1

  const methods = useForm<FormValues>({
    defaultValues: {
      id: nextId,
      fazenda: '',
      safra: '',
      dataSafra: '',
      cultura: '',
      troca: '',
      produtos: [],
      quantidade: 0,
      unidade: 'Kg',
      dose: '',
      numeroPedido: '',
      valor: 0,
      numeroCPR: '',
      dataVencimento: '',
      comprovantes: [],
      pedidos: [],
      observacoes: '',
    },
  })

  useEffect(() => {
    methods.reset({
      id: nextId,
      fazenda: '',
      safra: '',
      dataSafra: '',
      cultura: '',
      troca: '',
      produtos: [],
      quantidade: 0,
      unidade: 'Kg',
      dose: '',
      numeroPedido: '',
      valor: 0,
      numeroCPR: '',
      dataVencimento: '',
      comprovantes: [],
      pedidos: [],
      observacoes: '',
    })
  }, [nextId, methods])

  const onSubmit = methods.handleSubmit(data => {
    addEstoque(data)
    console.log('📦 Estoque cadastrado:', data)
    methods.reset()
  })

  return (
    <Box p="4">
      <Heading mb="4">Cadastrar Estoque</Heading>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <IDField isDisabled />
          <FazendaField />
          <SafraField />
          <DataSafraField />
          <CulturaField />
          <TrocaField />
          <ProdutoField />
          <QuantidadeField />
          <UnidadeField />
          <DoseField />
          <NumeroPedidoField />
          <ValorField />
          <NumeroCPRField />
          <DataVencimentoField />
          <ComprovanteField />
          <PedidoField />
          <ObservacoesField />

          <Button mt="4" colorScheme="blue" type="submit">
            Salvar Estoque
          </Button>
        </form>
      </FormProvider>
    </Box>
  )
}

export default CadastrarEstoque
