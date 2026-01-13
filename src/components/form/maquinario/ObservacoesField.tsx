// src/components/form/maquinario/ObservacoesField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function ObservacoesField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ observacoes: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.observacoes}>
      <FormLabel>Observações</FormLabel>
      <Textarea
        {...register('observacoes', {
          maxLength: {
            value: 500,
            message: 'Máximo de 500 caracteres',
          },
        })}
        placeholder="Digite suas observações aqui..."
        rows={4}
      />
      <FormErrorMessage>
        {errors.observacoes && String(errors.observacoes.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
