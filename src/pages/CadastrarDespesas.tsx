// C:\TI\PROJETOS_EM_ANDAMENTO\fazenda\src\pages\CadastrarDespesas.tsx

import React, { useEffect } from 'react'
import {
  Box,
  Heading,
  Button,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useDespesas } from '../context/useDespesas'
import { FazendaField } from '../components/form/despesa/FazendaField'
import { CompradorField } from '../components/form/despesa/CompradorField'
import { TipoDespesaField } from '../components/form/despesa/TipoDespesaField'
import { PagamentoGraoField } from '../components/form/despesa'
import { FormaPagamentoField } from '../components/form/despesa/FormaPagamentoField'
import { ValorDespesaField } from '../components/form/despesa/ValorDespesaField'
import { FormaPagamentoDetalhadoField } from '../components/form/despesa/FormaPagamentoDetalhadoField'
import { ComprovantePagamentoField } from '../components/form/despesa/ComprovantePagamentoField'
import { NotaFiscalField } from '../components/form/despesa/NotaFiscalField'
import { ObservacoesField } from '../components/form/despesa/ObservacoesField'

type FormValues = {
  id: number
  fazenda: string
  comprador: string
  tipoDespesa: string
  pagamentoEmGrao: boolean
  quantidadeGrao: string
  formaPagamento: 'avista' | 'parcelado'
  quantidadeParcelas: number
  valoresParcelas: string[]
  valorDespesa: string
  enviarParaDashboard: boolean
  formaPagamentoDetalhado: 'pix' | 'boleto' | 'transferencia'
  chavePix?: string
  anexosBoleto?: string[]
  banco?: string
  agencia?: string
  conta?: string
  comprovantesPagamento?: string[]
  notaFiscal?: string[]
  observacoes?: string
}

const CadastrarDespesas: React.FC = () => {
  const { addDespesa, despesas } = useDespesas()
  const toast = useToast()
  const nextId = despesas.length > 0 ? Math.max(...despesas.map(d => d.id)) + 1 : 1

  const methods = useForm<FormValues>({
    defaultValues: { id: nextId },
  })

  useEffect(() => {
    methods.reset({ id: nextId })
  }, [nextId, methods])

  const onSubmit = methods.handleSubmit(data => {
    addDespesa({
      id: data.id,
      fazenda: data.fazenda,
      comprador: data.comprador,
      tipoDespesa: data.tipoDespesa,
      pagamentoEmGrao: data.pagamentoEmGrao,
      quantidadeGrao: data.quantidadeGrao,
      formaPagamento: data.formaPagamento,
      quantidadeParcelas: data.quantidadeParcelas,
      valoresParcelas: data.valoresParcelas,
      valorDespesa: data.valorDespesa,
      enviarParaDashboard: data.enviarParaDashboard,
      formaPagamentoDetalhado: data.formaPagamentoDetalhado,
      chavePix: data.chavePix,
      anexosBoleto: data.anexosBoleto,
      banco: data.banco,
      agencia: data.agencia,
      conta: data.conta,
      comprovantesPagamento: data.comprovantesPagamento,
      notaFiscal: data.notaFiscal,
      observacoes: data.observacoes,
    }) // ⚠️ usando `as any` porque os outros campos foram removidos
    toast({
      title: `Despesa #${data.id} cadastrada`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    methods.reset()
  })

  return (
    <Box p="4">
      <Heading mb="6" size="lg">Cadastrar Despesa</Heading>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormLabel>ID</FormLabel>
          <Input type="number" isDisabled value={methods.getValues('id')} mb="6" />
          <FazendaField /> {/* ✅ Adicionado aqui */}
          <CompradorField />
          <TipoDespesaField />
          <PagamentoGraoField />
          <FormaPagamentoField />
          <ValorDespesaField />
          <FormaPagamentoDetalhadoField />
          <ComprovantePagamentoField />
          <NotaFiscalField />
          <ObservacoesField />
          <Button colorScheme="blue" type="submit">Salvar</Button>
        </form>
      </FormProvider>
          </Box>
  )
}

export default CadastrarDespesas
