// src/components/form/fazenda/AreaPlantadaField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const AreaPlantadaField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ areaPlantada: number }>()

  return (
    <FormControl isInvalid={!!errors.areaPlantada} isRequired>
      <FormLabel>Área Plantada (ha)</FormLabel>
      <Controller
        name="areaPlantada"
        control={control}
        rules={{
          required: 'Área Plantada é obrigatória',
          min: { value: 0, message: 'Valor deve ser igual ou maior que zero' },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            step="0.01"
            placeholder="Ex: 789.12"
          />
        )}
      />
      <FormErrorMessage>
        {errors.areaPlantada?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default AreaPlantadaField
