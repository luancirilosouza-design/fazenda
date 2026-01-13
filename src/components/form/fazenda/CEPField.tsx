// src/components/form/fazenda/CEPField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

// Regex permitindo apenas dígitos, espaço, '-', '/' e '.'
const pattern = new RegExp('^[0-9\\s\\-/.]*$')

const CEPField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ cep: string }>()

  return (
    <FormControl isInvalid={!!errors.cep} isRequired>
      <FormLabel>CEP</FormLabel>
      <Controller
        name="cep"
        control={control}
        rules={{
          required: 'CEP é obrigatório',
          pattern: {
            value: pattern,
            message: 'Somente números e caracteres “- / .” são permitidos',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Ex: 12345-678"
            maxLength={10}
          />
        )}
      />
      <FormErrorMessage>
        {errors.cep?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default CEPField
