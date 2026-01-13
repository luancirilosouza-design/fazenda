// src/components/form/empresa/VendedorField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const VendedorField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>Vendedor</FormLabel>
      <Input {...register('vendedor')} />
    </FormControl>
  )
}

export default VendedorField
