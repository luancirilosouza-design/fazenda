import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export default function IDField() {
  const { register, watch } = useFormContext<{ id: number }>()
  const currentId = watch('id')

  return (
    <FormControl mb="4">
      <FormLabel>ID</FormLabel>
      <Input
        {...register('id', { valueAsNumber: true })}
        value={currentId}
        isDisabled
      />
    </FormControl>
  )
}
