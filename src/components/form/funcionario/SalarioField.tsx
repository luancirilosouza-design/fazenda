// src/components/form/funcionario/SalarioField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function SalarioField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ salarioAtual: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.salarioAtual}>
      <FormLabel>Salário Atual</FormLabel>
      <InputGroup>
        <InputLeftAddon>R$</InputLeftAddon>
        <Input
          {...register('salarioAtual', {
            required: 'O salário atual é obrigatório',
            pattern: {
              value: /^[\d.,]+$/,
              message: 'Use apenas números, ponto e vírgula',
            },
          })}
          placeholder="Ex: 1.500,00"
        />
      </InputGroup>
      <FormErrorMessage>
        {errors.salarioAtual && String(errors.salarioAtual.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
