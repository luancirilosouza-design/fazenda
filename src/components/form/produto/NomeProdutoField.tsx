// src/components/form/produto/NomeProdutoField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ProductData } from '../../../context/ProdutoContext'

const NomeProdutoField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductData>()

  return (
    <FormControl isRequired isInvalid={!!errors.nome}>
      <FormLabel>Nome do Produto</FormLabel>
      <Input
        placeholder="Ex: Produto ABC-123!"
        {...register('nome', {
          required: 'Informe o nome do produto.',
          pattern: {
            // aceita letras, números, espaços e caracteres especiais
            value: /^[\s\S]+$/,
            message: 'Apenas letras, números e caracteres especiais.',
          },
        })}
      />
      <FormErrorMessage>
        {errors.nome && errors.nome.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default NomeProdutoField
