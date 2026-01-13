import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  HStack,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const ValorDespesaField: React.FC = () => {
  const { register, watch, setValue } = useFormContext()
  const enviar = watch('enviarParaDashboard')

  return (
    <FormControl>
      <FormLabel>Valor da Despesa:</FormLabel>
      <Input
        {...register('valorDespesa')}
        placeholder="R$0,00"
        onChange={(e) => {
          const valor = e.target.value
          setValue('valorDespesa', valor)
        }}
      />

      <Text mt="4" fontWeight="semibold">Enviar para Dashboard?</Text>
      <HStack spacing={6} mt={2}>
        <Checkbox
          isChecked={enviar}
          onChange={() => setValue('enviarParaDashboard', true)}
        >
          Enviar para Dashboard
        </Checkbox>
        <Checkbox
          isChecked={!enviar}
          onChange={() => setValue('enviarParaDashboard', false)}
        >
          NÃO enviar para Dashboard
        </Checkbox>
      </HStack>
    </FormControl>
  )
}
