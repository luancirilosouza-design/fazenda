import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  isDisabled?: boolean
}

const IDField = ({ isDisabled = false }: Props) => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>ID:</FormLabel>
      <Input
        type="number"
        isDisabled={isDisabled}
        {...register('id', { valueAsNumber: true })}
      />
    </FormControl>
  )
}

export default IDField
