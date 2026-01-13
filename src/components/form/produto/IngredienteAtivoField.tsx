// src/components/form/produto/IngredienteAtivoField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ProductData } from '../../../context/ProdutoContext'

const IngredienteAtivoField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductData>()

  return (
    <FormControl isRequired isInvalid={!!errors.ingredienteAtivo}>
      <FormLabel>Ingrediente Ativo</FormLabel>
      <Input
        placeholder="Ex: 1234-!@#"
        {...register('ingredienteAtivo', {
          required: 'Informe o ingrediente ativo.',
          pattern: {
            value: /^[\s\S]+$/,
            message: 'Apenas números e caracteres especiais.',
          },
        })}
      />
      <FormErrorMessage>
        {errors.ingredienteAtivo && errors.ingredienteAtivo.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default IngredienteAtivoField
