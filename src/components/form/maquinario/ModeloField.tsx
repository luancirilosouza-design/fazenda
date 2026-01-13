// src/components/form/maquinario/ModeloField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function ModeloField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ modelo: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.modelo}>
      <FormLabel>Modelo</FormLabel>
      <Input
        {...register('modelo', {
          required: 'O modelo é obrigatório',
          maxLength: {
            value: 100,
            message: 'Máximo de 100 caracteres',
          },
        })}
        placeholder="Ex: XJ-2020, Série 5G, 1000XL"
      />
      <FormErrorMessage>
        {errors.modelo && String(errors.modelo.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
