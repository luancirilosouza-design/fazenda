// src/components/form/funcionario/FuncaoField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function FuncaoField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ funcao: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.funcao}>
      <FormLabel>Função</FormLabel>
      <Input
        {...register('funcao', {
          required: 'A função é obrigatória',
          maxLength: {
            value: 100,
            message: 'Máximo de 100 caracteres',
          },
        })}
        placeholder="Ex: Supervisor, Operador #1, Auxiliar (Fábrica)"
      />
      <FormErrorMessage>
        {errors.funcao && String(errors.funcao.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
