// src/components/form/despesa/IDField.tsx
import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import type { DespesaData } from '../../../context/DespesasContext'

interface Props {
  /** Desabilita o campo para que o ID não possa ser editado */
  isDisabled?: boolean
}

const IDField: React.FC<Props> = ({ isDisabled = true }) => {
  const { register } = useFormContext<DespesaData>()
  return (
    <FormControl>
      <FormLabel>ID</FormLabel>
      <Input
        type="number"
        {...register('id', { valueAsNumber: true })}
        isDisabled={isDisabled}
      />
    </FormControl>
  )
}

export default IDField
