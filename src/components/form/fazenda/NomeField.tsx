// src/components/form/fazenda/NomeField.tsx

import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const NomeField: React.FC = () => {
  const { control } = useFormContext()

  return (
    <FormControl isRequired>
      <FormLabel>Nome</FormLabel>
      <Controller
        name="nome"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Digite o nome da fazenda"
          />
        )}
      />
    </FormControl>
  )
}

export default NomeField
