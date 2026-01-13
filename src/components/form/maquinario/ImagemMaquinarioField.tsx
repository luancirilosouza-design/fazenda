// src/components/form/maquinario/ImagemMaquinarioField.tsx
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  HStack,
  Text,
  CloseButton,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

export default function ImagemMaquinarioField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ imagens: File[] }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.imagens}>
      <FormLabel>Imagem do Maquinário</FormLabel>

      <Controller
        name="imagens"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return
            // agrega novos arquivos
            field.onChange([...field.value, ...Array.from(e.target.files)])
            e.target.value = ''
          }
          const removeAt = (idx: number) =>
            field.onChange(field.value.filter((_, i) => i !== idx))

          return (
            <>
              <Input
                type="file"
                multiple
                accept="image/png,image/jpeg"
                onChange={handleChange}
              />

              {field.value.length > 0 && (
                <List spacing="2" mt="2">
                  {field.value.map((file, i) => (
                    <ListItem key={i}>
                      <HStack spacing="2">
                        <Text isTruncated maxW="300px">
                          {file.name}
                        </Text>
                        <CloseButton size="sm" onClick={() => removeAt(i)} />
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )
        }}
      />

      {errors.imagens && (
        <Text color="red.500" fontSize="sm" mt="1">
          {errors.imagens.message as string}
        </Text>
      )}
    </FormControl>
  )
}
