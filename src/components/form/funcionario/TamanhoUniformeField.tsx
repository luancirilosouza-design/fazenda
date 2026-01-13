// src/components/form/funcionario/TamanhoUniformeField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Box,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function TamanhoUniformeField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    camiseta: string
    calca: string
    calcado: string
  }>()

  const pattern = {
    value: /^[A-Za-z0-9]+$/,
    message: 'Use apenas letras e números',
  }

  return (
    <Box mb="4">
      <FormLabel>Tamanho Uniforme</FormLabel>
      <VStack align="start" spacing="3" pl="2">
        {/* Camiseta */}
        <FormControl isInvalid={!!errors.camiseta}>
          <FormLabel fontSize="sm">Camiseta</FormLabel>
          <Input
            {...register('camiseta', {
              required: 'Informe o tamanho da camiseta',
              pattern,
            })}
            placeholder="Ex: M, G, GG"
          />
          <FormErrorMessage>
            {errors.camiseta && String(errors.camiseta.message)}
          </FormErrorMessage>
        </FormControl>

        {/* Calça */}
        <FormControl isInvalid={!!errors.calca}>
          <FormLabel fontSize="sm">Calça</FormLabel>
          <Input
            {...register('calca', {
              required: 'Informe o tamanho da calça',
              pattern,
            })}
            placeholder="Ex: 38, 40, 42"
          />
          <FormErrorMessage>
            {errors.calca && String(errors.calca.message)}
          </FormErrorMessage>
        </FormControl>

        {/* Calçado */}
        <FormControl isInvalid={!!errors.calcado}>
          <FormLabel fontSize="sm">Calçado</FormLabel>
          <Input
            {...register('calcado', {
              required: 'Informe o tamanho do calçado',
              pattern,
            })}
            placeholder="Ex: 38, 39, 40"
          />
          <FormErrorMessage>
            {errors.calcado && String(errors.calcado.message)}
          </FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  )
}
