import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useMaquinarios } from '../context/useMaquinarios'
import { IDField, FazendaField, CodigoIdentificacaoField, MarcaField, ModeloField, 
  AnoField, PlacaField, NovoUsadoField, ProprioArrendadoField, AnexarContratoField, 
  HorasVerificacaoField, ImagemMaquinarioField, ObservacoesField} from '../components/form/maquinario'

export default function CadastrarMaquinario() {
  const { addMaquinario, maquinarios } = useMaquinarios()
  const nextId =
    maquinarios.length > 0
      ? Math.max(...maquinarios.map(m => m.id)) + 1
      : 1

  const methods = useForm<{ id: number, fazenda: string, codigoIdentificacao: string, 
    marca: string, modelo: string, ano: string, placa: string, condicao: string, 
    propriedade: string, contratos: File[], horasTrabalhadas: string, 
    dataVerificacao: string, imagens: File[], observacoes: string }>({
    defaultValues: { id: nextId, fazenda: '', codigoIdentificacao: '', 
      marca: '', modelo: '', ano: '', placa: '', condicao: '', 
      propriedade: '', contratos: [], horasTrabalhadas: '', dataVerificacao: '', imagens: [], observacoes: '' },
  })

  const onSubmit = methods.handleSubmit(data => {
    addMaquinario(data)
    methods.reset({ id: nextId + 1 })
  })

  return (
    <Box p="4">
      <Heading mb="4">Cadastrar Maquinário</Heading>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <IDField />
          <FazendaField />
          <CodigoIdentificacaoField />
          <MarcaField /> 
          <ModeloField />
          <AnoField />
          <PlacaField />
          <NovoUsadoField />
          <ProprioArrendadoField />
          <AnexarContratoField />
          <HorasVerificacaoField />
          <ImagemMaquinarioField />
          <ObservacoesField />
          <Button mt="4" colorScheme="blue" type="submit">
            Salvar Maquinário
          </Button>
        </form>
      </FormProvider>
    </Box>
  )
}
