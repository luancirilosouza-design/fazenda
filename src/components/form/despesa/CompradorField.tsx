import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const CompradorField: React.FC = () => {
  const { register } = useFormContext()

  return (
    <FormControl>
      <FormLabel>Compra realizada por:</FormLabel>
      <Input
        {...register('comprador')}
        placeholder="Digite o nome ou identificação do comprador"
      />
    </FormControl>
  )
}
