// src/components/form/maquinario/NovoUsadoField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

export default function NovoUsadoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ condicao: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.condicao}>
      <FormLabel htmlFor="condicao">Condição</FormLabel>

      <Controller
        name="condicao"
        control={control}
        rules={{ required: 'Selecione Novo ou Usado' }}
        render={({ field }) => (
          <RadioGroup {...field} id="condicao">
            <HStack spacing="6">
              <Radio value="Novo">Novo</Radio>
              <Radio value="Usado">Usado</Radio>
            </HStack>
          </RadioGroup>
        )}
      />

      <FormErrorMessage>
        {errors.condicao?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
