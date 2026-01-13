// src/components/form/fazenda/AreaTotalField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

// componente agora assume número, não string
const AreaTotalField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ areaTotal: number }>()

  return (
    <FormControl isInvalid={!!errors.areaTotal} isRequired>
      <FormLabel>Área Total (ha)</FormLabel>
      <Controller
        name="areaTotal"
        control={control}
        rules={{
          required: 'Área Total é obrigatória',
          min: { value: 0, message: 'Valor deve ser igual ou maior que zero' },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            step="0.01"
            placeholder="Ex: 1234.56"
          />
        )}
      />
      <FormErrorMessage>
        {errors.areaTotal?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default AreaTotalField
