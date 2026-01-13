import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { DespesaData } from '../../../context/DespesasContext'
import { useDespesas } from '../../../context/DespesasContext'
import { IDField, FazendaField } from '.' // ✅ apenas os campos ativos
import { Button, VStack } from '@chakra-ui/react'

export const DespesaForm: React.FC = () => {
  const methods = useForm<DespesaData>({
    defaultValues: {
      id: 0,
      fazenda: '',
    },
  })

  const { addDespesa } = useDespesas()

  const onSubmit = (data: DespesaData) => {
    addDespesa(data)
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <IDField />
          <FazendaField />
          <Button colorScheme="green" type="submit">
            Salvar Despesa
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
