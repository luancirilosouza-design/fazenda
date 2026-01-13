// src/components/form/maquinario/CodigoIdentificacaoField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function CodigoIdentificacaoField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ codigoIdentificacao: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.codigoIdentificacao}>
      <FormLabel>Código de Identificação (Adesivo)</FormLabel>
      <Input
        {...register('codigoIdentificacao', {
          required: 'O código de identificação é obrigatório',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Use apenas números',
          },
        })}
        placeholder="Digite apenas números"
      />
      <FormErrorMessage>
        {errors.codigoIdentificacao && String(errors.codigoIdentificacao.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
