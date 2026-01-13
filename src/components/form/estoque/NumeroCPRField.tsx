import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const NumeroCPRField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Número CPR:</FormLabel>
      <Input
        placeholder="Digite o número do CPR"
        {...register('numeroCPR')}
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </FormControl>
  )
}

export default NumeroCPRField
