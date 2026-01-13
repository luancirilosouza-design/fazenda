// src/components/form/fazenda/FazendaForm.tsx

import React from 'react'
import { VStack, Button, useToast } from '@chakra-ui/react'
import {
  useForm,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form'
import { useFazenda } from '../../../context/useFazenda'
import IDField from './IDField'
import NomeField from './NomeField'
import NumeroCarEstadualField from './NumeroCarEstadualField'
import IEField from './IEField'
import CEPField from './CEPField'
import AreaTotalField from './AreaTotalField'
import AreaPlantadaField from './AreaPlantadaField'
import MapaFazendaField from './MapaFazendaField'
import ObservacoesField from './ObservacoesField'

interface FormValues {
  id: string
  nome: string
  numeroCarEstadual: string
  ie: string
  cep: string
  areaTotal: number
  areaPlantada: number
  mapaDaFazenda: File[]
  observacoes: string
}

const FazendaForm: React.FC = () => {
  const { nextId, addFazenda } = useFazenda()
  const toast = useToast()

  const methods = useForm<FormValues>({
    defaultValues: {
      id: nextId.toString(),
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

  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addFazenda({
      nome: data.nome,
      numeroCarEstadual: data.numeroCarEstadual,
      ie: data.ie,
      cep: data.cep,
      areaTotal: data.areaTotal,
      areaPlantada: data.areaPlantada,
      mapaDaFazenda: data.mapaDaFazenda,
      observacoes: data.observacoes,
    })

    reset({
      nome: '',
      numeroCarEstadual: '',
      ie: '',
      cep: '',
      areaTotal: 0,
      areaPlantada: 0,
      mapaDaFazenda: [],
      observacoes: '',
    })

    toast({
      title: 'Fazenda salva',
      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4" align="stretch">
          <IDField />
          <NomeField />
          <NumeroCarEstadualField />
          <IEField />
          <CEPField />
          <AreaTotalField />
          <AreaPlantadaField />
          <MapaFazendaField />
          <ObservacoesField />
          <Button type="submit" colorScheme="green">
            Salvar
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}

export default FazendaForm
