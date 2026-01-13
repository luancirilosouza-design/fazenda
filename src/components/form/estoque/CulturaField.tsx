import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const CulturaField = () => {
  const { register, watch } = useFormContext()
  const cultura = watch('cultura')

  return (
    <FormControl mb="4">
      <FormLabel>Cultura:</FormLabel>
      <Select placeholder="Selecione a cultura" {...register('cultura')}>
        <option value="Soja">Soja</option>
        <option value="Milho">Milho</option>
        <option value="Feijão">Feijão</option>
        <option value="Arroz">Arroz</option>
        <option value="Gergelim">Gergelim</option>
      </Select>
      {cultura && (
        <Text mt="2" fontWeight="semibold">
          Cultura selecionada: <em>{cultura}</em>
        </Text>
      )}
    </FormControl>
  )
}

export default CulturaField
