import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function AnoField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ ano: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.ano}>
      <FormLabel>Ano</FormLabel>
      <Input
        {...register('ano', {
          required: 'O ano é obrigatório',
          pattern: {
            value: /^[0-9]{4}\/[0-9]{4}$/,
            message: 'Use o formato aaaa/aaaa (ex: 2020/2021)',
          },
        })}
        placeholder="Ex: 2020/2021"
      />
      <FormErrorMessage>
        {errors.ano && String(errors.ano.message)}
      </FormErrorMessage>
    </FormControl>
  )
}
