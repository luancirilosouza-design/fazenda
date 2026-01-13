import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const NumeroPedidoField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Número do Pedido:</FormLabel>
      <Input
        placeholder="Informe o número do pedido"
        {...register('numeroPedido')}
      />
    </FormControl>
  )
}

export default NumeroPedidoField
