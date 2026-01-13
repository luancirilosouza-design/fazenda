// src/components/form/fazenda/MapaFazendaField.tsx

import React, { useEffect, useMemo } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Link,
  CloseButton,
  VStack,
} from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg']

const MapaFazendaField: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<{ mapaDaFazenda: File[] }>()

  // 1) Obtenha o valor bruto
  const watchedFiles = watch('mapaDaFazenda')

  // 2) Memoize esse valor, tirando o `|| []` do dependency
  const files: File[] = useMemo(
    () => watchedFiles || [],
    [watchedFiles]
  )

  // 3) Agora memoize os previews
  const filePreviews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  )

  // 4) Revoke no cleanup
  useEffect(() => {
    return () => {
      filePreviews.forEach((fp) => URL.revokeObjectURL(fp.url))
    }
  }, [filePreviews])

  return (
    <FormControl isInvalid={!!errors.mapaDaFazenda}>
      <FormLabel>Mapa da Fazenda</FormLabel>
      <Controller
        name="mapaDaFazenda"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (arr: File[]) =>
            arr.every((f) => ACCEPTED_TYPES.includes(f.type)) ||
            'Apenas PNG e JPG são permitidos',
        }}
        render={({ field }) => (
          <>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.files || [])
                field.onChange([...(field.value || []), ...selected])
              }}
            />

            <VStack mt="2" align="stretch" spacing={1}>
              {filePreviews.map(({ file, url }, idx) => (
                <HStack key={idx} justify="space-between">
                  <Link
                    href={url}
                    isExternal
                    color="blue.500"
                    fontSize="sm"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {file.name}
                  </Link>
                  <CloseButton
                    size="sm"
                    onClick={() => {
                      const filtered = files.filter((_, i) => i !== idx)
                      setValue('mapaDaFazenda', filtered, {
                        shouldValidate: true,
                      })
                    }}
                  />
                </HStack>
              ))}
            </VStack>
          </>
        )}
      />
      <FormErrorMessage>
        {errors.mapaDaFazenda?.message as string}
      </FormErrorMessage>
    </FormControl>
  )
}

export default MapaFazendaField
