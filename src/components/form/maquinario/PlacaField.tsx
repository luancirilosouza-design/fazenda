import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function PlacaField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ placa: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.placa}>
      <FormLabel>Placa</FormLabel>
      <Input
        {...register('placa', {
          required: 'A placa é obrigatória',
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: 'Use apenas letras e números',
          },
          maxLength: {
            value: 10,
            message: 'Máximo de 10 caracteres',
          },
        })}
        placeholder="Ex: ABC1234"
      />
      <FormErrorMessage>
        {errors.placa && String(errors.placa.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
