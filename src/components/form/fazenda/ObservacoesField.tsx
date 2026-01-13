// src/components/form/fazenda/ObservacoesField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const ObservacoesField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ observacoes: string }>()

  return (
    <FormControl isInvalid={!!errors.observacoes}>
      <FormLabel>Observações</FormLabel>
      <Controller
        name="observacoes"
        control={control}
        defaultValue=""
        rules={{
          maxLength: {
            value: 500,
            message: 'Máximo de 500 caracteres',
          },
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Digite suas observações aqui..."
            resize="vertical"
            rows={4}
            maxLength={500}
          />
        )}
      />
      <FormErrorMessage>
        {errors.observacoes?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default ObservacoesField
