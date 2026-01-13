// src/components/form/produto/IDField.tsx

import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { ProductData } from '../../../context/ProdutoContext'

interface Props {
  isDisabled?: boolean
}

const IDField: React.FC<Props> = ({ isDisabled = false }) => {
  const { register } = useFormContext<ProductData>()

  return (
    <FormControl>
      <FormLabel htmlFor="id">ID</FormLabel>
      <Input
        id="id"
        placeholder="ID"
        {...register('id')}
        isDisabled={isDisabled}
      />
    </FormControl>
  )
}

export default IDField
