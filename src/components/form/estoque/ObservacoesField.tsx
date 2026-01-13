import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const ObservacoesField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Observações:</FormLabel>
      <Textarea
        placeholder="Escreva qualquer observação aqui..."
        {...register('observacoes')}
        resize="vertical"
      />
    </FormControl>
  )
}

export default ObservacoesField
