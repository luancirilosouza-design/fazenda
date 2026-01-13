// src/components/form/fazenda/IDField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

interface IDFieldProps {
  isDisabled?: boolean
}

const IDField: React.FC<IDFieldProps> = ({ isDisabled = false }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ id: number }>()

  return (
    <FormControl isInvalid={!!errors.id}>
      <FormLabel>ID</FormLabel>
      <Controller
        name="id"
        control={control}
        // não precisa defaultValue aqui se você já setou defaultValues no useForm
        rules={{ required: 'ID obrigatório' }}
        render={({ field }) => (
          <Input {...field} isDisabled={isDisabled} />
        )}
      />
      <FormErrorMessage>
        {errors.id?.message as string}
      </FormErrorMessage>
    </FormControl>
  )
}

export default IDField
