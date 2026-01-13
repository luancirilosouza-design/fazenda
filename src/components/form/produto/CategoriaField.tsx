// src/components/form/produto/CategoriaField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ProductData } from '../../../context/ProdutoContext'

const CategoriaField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductData>()

  return (
    <FormControl isRequired isInvalid={!!errors.categoria}>
      <FormLabel>Categoria</FormLabel>
      <Select placeholder="Selecione a categoria" {...register('categoria', {
        required: 'Informe a categoria do produto.',
      })}>
        <option value="Adubo">Adubo</option>
        <option value="Semente">Semente</option>
        <option value="Fungicida">Fungicida</option>
        <option value="Nutrição">Nutrição</option>
        <option value="Adjuvante">Adjuvante</option>
        <option value="Calcário">Calcário</option>
      </Select>
      <FormErrorMessage>
        {errors.categoria && errors.categoria.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default CategoriaField
