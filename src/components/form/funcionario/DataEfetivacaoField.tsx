import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export default function DataEfetivacaoField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ dataEfetivacao: string }>()

  const rawDate = watch('dataEfetivacao') || ''
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
  const displayDate = isValidDate ? formatDate(rawDate) : ''

  return (
    <FormControl mb="4" isInvalid={!!errors.dataEfetivacao}>
      <FormLabel>Data de Efetivação</FormLabel>
      <Input
        type="date"
        {...register('dataEfetivacao', {
          required: 'A data de efetivação é obrigatória',
        })}
        max={new Date().toISOString().split('T')[0]}
      />
      <FormErrorMessage>
        {errors.dataEfetivacao && String(errors.dataEfetivacao.message)}
      </FormErrorMessage>

      {isValidDate && (
        <Box mt="2">
          <Text fontSize="sm" color="gray.600">
            Data selecionada: {displayDate}
          </Text>
        </Box>
      )}
    </FormControl>
  )
}
