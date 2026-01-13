import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const ValorField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Valor Real R$:</FormLabel>
      <InputGroup>
        <InputLeftAddon children="R$" />
        <Input
          placeholder="0,00"
          {...register('valor')}
          inputMode="decimal"
        />
      </InputGroup>
    </FormControl>
  )
}

export default ValorField
