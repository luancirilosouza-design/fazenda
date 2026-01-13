// src/components/form/funcionario/NomeField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function NomeField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ nome: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.nome}>
      <FormLabel>Nome do Funcionário</FormLabel>
      <Input
        {...register('nome', {
          required: 'O nome é obrigatório',
          pattern: {
            value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
            message: 'Use apenas letras e espaços',
          },
        })}
        placeholder="Digite o nome completo"
      />
      <FormErrorMessage>
        {errors.nome && String(errors.nome.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
