import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const validarData = (valor: string) => {
  const formato1 = /^\d{2}\/\d{2}\/\d{4}$/ // dd/mm/aaaa
  const formato2 = /^\d{4}\/\d{4}$/ // aaaa/aaaa
  return formato1.test(valor) || formato2.test(valor) || 'Formato inválido: use dd/mm/aaaa ou aaaa/aaaa'
}

const DataSafraField = () => {
  const { register, formState } = useFormContext()
  const mensagemErro = formState.errors.dataSafra?.message as string

  return (
    <FormControl mb="4">
      <FormLabel>Data da Safra/Safrinha:</FormLabel>
      <Input
        placeholder="dd/mm/aaaa ou aaaa/aaaa"
        {...register('dataSafra', { validate: validarData })}
      />
      {mensagemErro && (
        <Text mt="1" color="red.500" fontSize="sm">
          {mensagemErro}
        </Text>
      )}
    </FormControl>
  )
}

export default DataSafraField
