// src/components/form/produto/ObservacoesField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ProductData } from '../../../context/ProdutoContext'

const ObservacoesField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductData>()

  return (
    <FormControl isInvalid={!!errors.observacoes}>
      <FormLabel>Observações</FormLabel>
      <Textarea
        placeholder="Digite aqui suas observações"
        rows={4}
        {...register('observacoes')}
      />
      <FormErrorMessage>
        {errors.observacoes?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default ObservacoesField
