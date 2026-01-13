import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Box,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

// formata yyyy-mm-dd → dd/mm/aaaa
const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export default function HorasVerificacaoField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{
    horasTrabalhadas: string
    dataVerificacao: string
  }>()

  // observa valor raw do date
  const rawDate = watch('dataVerificacao') || ''
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
  const displayDate = isValidDate ? formatDate(rawDate) : ''

  return (
    <Box mb="4">
      <HStack spacing="6" align="start">
        {/* Horas Trabalhadas */}
        <FormControl flex="1" isInvalid={!!errors.horasTrabalhadas}>
          <FormLabel>Horas Trabalhadas</FormLabel>
          <Input
            {...register('horasTrabalhadas', {
              required: 'Informe as horas trabalhadas',
              pattern: {
                value: /^[^A-Za-z]+$/,
                message: 'Use apenas números e caracteres especiais',
              },
            })}
            placeholder="Ex: 150,5 ou 02:30"
          />
          <FormErrorMessage>
            {errors.horasTrabalhadas?.message as string}
          </FormErrorMessage>
        </FormControl>

        {/* Data da Verificação */}
        <FormControl flex="1" isInvalid={!!errors.dataVerificacao}>
          <FormLabel>Data da Verificação</FormLabel>
          <Input
            type="date"
            {...register('dataVerificacao', {
              required: 'Informe a data de verificação',
            })}
            max={new Date().toISOString().split('T')[0]}
          />
          <FormErrorMessage>
            {errors.dataVerificacao?.message as string}
          </FormErrorMessage>

          {isValidDate && (
            <Text fontSize="sm" color="gray.600" mt="1">
              Data selecionada: {displayDate}
            </Text>
          )}
        </FormControl>
      </HStack>
    </Box>
  )
}
