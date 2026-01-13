// src/components/form/produto/ImagemProdutoField.tsx

import React, { useEffect, useMemo } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Link,
  CloseButton,
  VStack,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import type { ProductData } from '../../../context/ProdutoContext';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];

const ImagemProdutoField: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductData>();

  const watchedFiles = watch('imagemProduto');

  const files: File[] = useMemo(() => watchedFiles || [], [watchedFiles]);

  const filePreviews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      filePreviews.forEach((fp) => URL.revokeObjectURL(fp.url));
    };
  }, [filePreviews]);

  return (
    <FormControl isInvalid={!!errors.imagemProduto}>
      <FormLabel>Imagem do Produto</FormLabel>
      <Controller
        name="imagemProduto"
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
              accept={ACCEPTED_TYPES.join(',')}
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                field.onChange([...(field.value || []), ...selected]);
              }}
            />

            <VStack mt={2} align="stretch" spacing={1}>
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
                      const filtered = files.filter((_, i) => i !== idx);
                      setValue('imagemProduto', filtered, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </HStack>
              ))}
            </VStack>
          </>
        )}
      />
      <FormErrorMessage>
        {errors.imagemProduto?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export default ImagemProdutoField;
