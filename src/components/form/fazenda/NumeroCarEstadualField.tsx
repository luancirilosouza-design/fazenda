// src/components/form/fazenda/NumeroCarEstadualField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

// RegExp via string: não precisa escapar '/' 
const pattern = new RegExp('^[0-9\\s\\-/.]*$')

const NumeroCarEstadualField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ numeroCarEstadual: string }>()

  return (
    <FormControl isInvalid={!!errors.numeroCarEstadual} isRequired>
      <FormLabel>Número CAR Estadual</FormLabel>
      <Controller
        name="numeroCarEstadual"
        control={control}
        rules={{
          required: 'Número CAR Estadual é obrigatório',
          pattern: {
            value: pattern,
            message: 'Somente números e caracteres “- / .” são permitidos',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Ex: 12345-678/2025"
            maxLength={20}
          />
        )}
      />
      <FormErrorMessage>
        {errors.numeroCarEstadual?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default NumeroCarEstadualField
