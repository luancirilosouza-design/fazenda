// src/components/form/funcionario/DataNascimentoField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Box,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const calculateAge = (dateString: string): number => {
  const [year, month, day] = dateString.split('-').map(Number)
  const today = new Date()
  const birthDate = new Date(year, month - 1, day)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export default function DataNascimentoField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ dataNascimento: string }>()

  const rawDate = watch('dataNascimento') || ''  // formato ISO: "yyyy-mm-dd"
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
  const displayDate = isValidDate ? formatDate(rawDate) : ''
  const age = isValidDate ? calculateAge(rawDate) : null

  return (
    <FormControl mb="4" isInvalid={!!errors.dataNascimento}>
      <FormLabel>Data de Nascimento</FormLabel>
      <Input
        type="date"
        {...register('dataNascimento', {
          required: 'A data de nascimento é obrigatória',
        })}
        max={new Date().toISOString().split('T')[0]}
      />
      <FormErrorMessage>
        {errors.dataNascimento && String(errors.dataNascimento.message)}
      </FormErrorMessage>

      {isValidDate && (
        <Box mt="2">
          <Text fontSize="sm" color="gray.600">
            Data selecionada: {displayDate}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Idade atual: {age} anos
          </Text>
        </Box>
      )}
    </FormControl>
  )
}
