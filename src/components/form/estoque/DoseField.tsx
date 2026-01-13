import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const DoseField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Dose:</FormLabel>
      <Input
        placeholder="Informe a dose (quantidade, texto ou símbolo)"
        {...register('dose')}
      />
    </FormControl>
  )
}

export default DoseField
