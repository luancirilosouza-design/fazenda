import React from 'react'
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Select,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const FormaPagamentoField: React.FC = () => {
  const { setValue, watch, register } = useFormContext()
  const formaPagamento = watch('formaPagamento')
  const quantidadeParcelas = watch('quantidadeParcelas')

  const parcelas = Array.from({ length: 100 }, (_, i) => `${i + 1}x`)

  return (
    <FormControl>
      <FormLabel>Pagamento à Vista/Parcelado</FormLabel>
      <ButtonGroup isAttached mb="4">
        <Button
          colorScheme={formaPagamento === 'parcelado' ? 'blue' : 'gray'}
          onClick={() => setValue('formaPagamento', 'parcelado')}
        >
          Parcelado
        </Button>
        <Button
          colorScheme={formaPagamento === 'avista' ? 'green' : 'gray'}
          onClick={() => {
            setValue('formaPagamento', 'avista')
            setValue('quantidadeParcelas', 1)
            setValue('valoresParcelas', [''])
          }}
        >
          À Vista
        </Button>
      </ButtonGroup>

      {formaPagamento === 'parcelado' && (
        <>
          <FormLabel>Quantidade de Parcelas</FormLabel>
          <Select
            {...register('quantidadeParcelas', { valueAsNumber: true })}
            placeholder="Selecione"
            maxH="200px"
            overflowY="auto"
          >
            {parcelas.map((p, i) => (
              <option key={p} value={i + 1}>
                {p}
              </option>
            ))}
          </Select>

          <VStack mt="4" spacing={3}>
            {Array.from({ length: quantidadeParcelas || 0 }, (_, i) => (
              <Input
                key={i}
                {...register(`valoresParcelas.${i}`)}
                placeholder={`Valor da ${i + 1}ª Parcela R$`}
              />
            ))}
          </VStack>
        </>
      )}
    </FormControl>
  )
}
