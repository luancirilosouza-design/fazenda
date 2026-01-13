import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const QuantidadeField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Quantidade:</FormLabel>
      <Input
        type="number"
        placeholder="Informe a quantidade"
        {...register('quantidade', { valueAsNumber: true })}
      />
    </FormControl>
  )
}

export default QuantidadeField
