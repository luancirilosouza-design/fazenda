// src/components/form/maquinario/AnexarContratoField.tsx
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

export default function AnexarContratoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ contratos: File[] }>()

  return (
    <FormControl mb="4" isInvalid={!!errors.contratos}>
      <FormLabel>Anexar contrato de compra</FormLabel>

      <Controller
        name="contratos"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          // Manipula seleção de novos arquivos
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files
            if (!files) return
            field.onChange([...field.value, ...Array.from(files)])
            e.target.value = ''  // limpa o input para permitir reupload
          }

          // Remove um arquivo específico
          const handleRemove = (index: number) => {
            const updated = field.value.filter((_, i) => i !== index)
            field.onChange(updated)
          }

          return (
            <>
              <Input
                type="file"
                multiple
                accept=".pdf,image/png,image/jpeg"
                onChange={handleChange}
              />

              {field.value.length > 0 && (
                <List spacing="2" mt="2">
                  {field.value.map((file, idx) => (
                    <ListItem key={idx}>
                      <HStack spacing="2">
                        <Text isTruncated maxW="300px">
                          {file.name}
                        </Text>
                        <CloseButton
                          size="sm"
                          onClick={() => handleRemove(idx)}
                        />
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )
        }}
        rules={{
          validate: files =>
            files.length > 0 || 'Anexe ao menos um contrato',
        }}
      />
      {errors.contratos && (
        <Text color="red.500" fontSize="sm" mt="1">
          {errors.contratos.message as string}
        </Text>
      )}
    </FormControl>
  )
}
