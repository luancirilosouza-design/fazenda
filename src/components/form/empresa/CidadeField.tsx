// src/components/form/empresa/CidadeField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const CidadeField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>Cidade</FormLabel>
      <Input {...register('cidade')} />
    </FormControl>
  )
}

export default CidadeField
