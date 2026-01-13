// src/components/form/maquinario/ProprioArrendadoField.tsx
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

export default function ProprioArrendadoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ propriedade: string }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.propriedade}>
      <FormLabel htmlFor="propriedade">Tipo de Posse</FormLabel>

      <Controller
        name="propriedade"
        control={control}
        rules={{ required: 'Selecione Próprio ou Arrendado' }}
        render={({ field }) => (
          <RadioGroup {...field} id="propriedade">
            <HStack spacing="6">
              <Radio value="Próprio">Próprio</Radio>
              <Radio value="Arrendado">Arrendado</Radio>
            </HStack>
          </RadioGroup>
        )}
      />

      <FormErrorMessage>
        {errors.propriedade?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
