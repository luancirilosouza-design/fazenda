// src/components/form/empresa/EmailField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

const EmailField: React.FC = () => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl isRequired>
      <FormLabel>E-mail</FormLabel>
      <Input type="email" {...register('email')} />
    </FormControl>
  )
}

export default EmailField
