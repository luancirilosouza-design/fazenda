// src/pages/CadastrarFazenda.tsx

import React, { useEffect } from 'react'
import { Box, Button, useToast } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useFazenda } from '../context/useFazenda'

import type { SubmitHandler } from 'react-hook-form'
import type { FazendaData } from '../context/FazendaContext'

// Campos do formulário
import IDField from '../components/form/fazenda/IDField'
import NomeField from '../components/form/fazenda/NomeField'
import NumeroCarEstadualField from '../components/form/fazenda/NumeroCarEstadualField'
import IEField from '../components/form/fazenda/IEField'
import CEPField from '../components/form/fazenda/CEPField'
import AreaTotalField from '../components/form/fazenda/AreaTotalField'
import AreaPlantadaField from '../components/form/fazenda/AreaPlantadaField'
import MapaFazendaField from '../components/form/fazenda/MapaFazendaField'
import ObservacoesField from '../components/form/fazenda/ObservacoesField'

type FormValues = Omit<FazendaData, 'id' | 'dataCadastro'>

const CadastrarFazenda: React.FC = () => {
  const { addFazenda, nextId } = useFazenda()
  const toast = useToast()

  // Inicializa o form com todos os campos, incluindo id
  const methods = useForm<FormValues & { id: number }>({
    defaultValues: {
      id: nextId,
      nome: '',
      numeroCarEstadual: '',
      ie: '',
      cep: '',
      areaTotal: 0,
      areaPlantada: 0,
      mapaDaFazenda: [],
      observacoes: '',
    },
  })

  // Sempre que o nextId mudar, reseta todo o form (incluindo o id)
  useEffect(() => {
    methods.reset({
      id: nextId,
      nome: '',
      numeroCarEstadual: '',
      ie: '',
      cep: '',
      areaTotal: 0,
      areaPlantada: 0,
      mapaDaFazenda: [],
      observacoes: '',
    })
  }, [nextId, methods])

  const onSubmit: SubmitHandler<FormValues & { id: number }> = data => {
    // Retira id e passa o restante para o contexto
    const { id, ...rest } = data
    addFazenda(rest)

    toast({
      title: `Fazenda #${id} cadastrada com sucesso`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // Não precisa chamar reset aqui — o useEffect fará isso
  }

  return (
    <Box p="4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <IDField isDisabled />
          <NomeField />
          <NumeroCarEstadualField />
          <IEField />
          <CEPField />
          <AreaTotalField />
          <AreaPlantadaField />
          <MapaFazendaField />
          <ObservacoesField />

          <Button mt="4" colorScheme="blue" type="submit">
            Salvar
          </Button>
        </form>
      </FormProvider>
    </Box>
  )
}

export default CadastrarFazenda
