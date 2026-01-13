// src/components/form/empresa/NomeField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const NomeField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>Nome da Empresa</FormLabel>
      <Input {...register('nome')} />
    </FormControl>
  )
}

export default NomeField
