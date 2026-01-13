// src/components/form/fazenda/IEField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

// regex que permite dígitos, espaço, '-', '/' e '.'
const pattern = new RegExp('^[0-9\\s\\-/.]*$')

const IEField: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ ie: string }>()

  return (
    <FormControl isInvalid={!!errors.ie} isRequired>
      <FormLabel>I.E.</FormLabel>
      <Controller
        name="ie"
        control={control}
        rules={{
          required: 'I.E. é obrigatório',
          pattern: {
            value: pattern,
            message: 'Somente números e caracteres “- / .” são permitidos',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Ex: 123456-7.89"
            maxLength={20}
          />
        )}
      />
      <FormErrorMessage>
        {errors.ie?.message as string}
      </FormErrorMessage>
    </FormControl>
  )
}

export default IEField
