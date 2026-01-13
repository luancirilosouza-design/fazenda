// src/components/form/maquinario/MarcaField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function MarcaField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ marca: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.marca}>
      <FormLabel>Marca</FormLabel>
      <Input
        {...register('marca', {
          required: 'A marca é obrigatória',
          maxLength: {
            value: 100,
            message: 'Máximo de 100 caracteres',
          },
        })}
        placeholder="Ex: John Deere, Caterpillar, XYZ-100"
      />
      <FormErrorMessage>
        {errors.marca && String(errors.marca.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
