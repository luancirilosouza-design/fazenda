// src/components/form/empresa/TelefoneVendedorField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const TelefoneVendedorField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>Telefone do Vendedor</FormLabel>
      <Input {...register('telefoneVendedor')} />
    </FormControl>
  )
}

export default TelefoneVendedorField
