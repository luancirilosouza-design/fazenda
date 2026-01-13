import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const UnidadeField = () => {
  const { register } = useFormContext()

  return (
    <FormControl mb="4">
      <FormLabel>Unidade:</FormLabel>
      <Select placeholder="Selecione a unidade" {...register('unidade')}>
        <option value="Tonelada">Tonelada</option>
        <option value="Litros">Litros</option>
        <option value="Kg">Kg</option>
        <option value="Sacas">Sacas</option>
        <option value="Bag">Bag</option>
      </Select>
    </FormControl>
  )
}

export default UnidadeField
