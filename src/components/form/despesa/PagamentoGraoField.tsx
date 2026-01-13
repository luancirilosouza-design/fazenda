import React from 'react'
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const PagamentoGraoField: React.FC = () => {
  const { setValue, watch, register } = useFormContext()
  const pagamentoEmGrao = watch('pagamentoEmGrao')

  return (
    <FormControl>
      <FormLabel>Pagamento em Grão/Saca?</FormLabel>
      <ButtonGroup isAttached mb="4">
        <Button
          colorScheme={pagamentoEmGrao ? 'green' : 'gray'}
          onClick={() => setValue('pagamentoEmGrao', true)}
        >
          Sim
        </Button>
        <Button
          colorScheme={!pagamentoEmGrao ? 'red' : 'gray'}
          onClick={() => setValue('pagamentoEmGrao', false)}
        >
          Não
        </Button>
      </ButtonGroup>

      {pagamentoEmGrao && (
        <FormControl>
          <FormLabel>Quantidade de Grão/Sacas:</FormLabel>
          <Input
            {...register('quantidadeGrao')}
            placeholder="Digite a quantidade (números, letras ou símbolos)"
          />
        </FormControl>
      )}
    </FormControl>
  )
}
