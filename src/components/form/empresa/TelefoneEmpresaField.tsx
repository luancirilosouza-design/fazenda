// src/components/form/empresa/TelefoneEmpresaField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const TelefoneEmpresaField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>Telefone da Empresa</FormLabel>
      <Input {...register('telefoneEmpresa')} />
    </FormControl>
  )
}

export default TelefoneEmpresaField
