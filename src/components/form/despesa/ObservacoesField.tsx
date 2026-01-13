import React from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const ObservacoesField: React.FC = () => {
  const { register } = useFormContext()

  return (
    <FormControl>
      <FormLabel>Observações</FormLabel>
      <Textarea
        {...register('observacoes')}
        placeholder="Digite qualquer observação relevante..."
        resize="vertical"
        rows={4}
      />
    </FormControl>
  )
}
