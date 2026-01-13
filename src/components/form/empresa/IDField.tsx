// src/components/form/empresa/IDField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { EmpresaData } from '../../../context/EmpresaContext'

interface Props { isDisabled?: boolean }

const IDField: React.FC<Props> = ({ isDisabled }) => {
  const { register } = useFormContext<EmpresaData>()
  return (
    <FormControl>
      <FormLabel>ID</FormLabel>
      <Input type="number" {...register('id', { valueAsNumber: true })} isDisabled={isDisabled} />
    </FormControl>
  )
}

export default IDField
