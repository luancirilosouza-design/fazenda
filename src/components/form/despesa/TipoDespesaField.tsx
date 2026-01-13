import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const opcoes = [
  'Aplicações',
  'Armazém',
  'Balança',
  'Caminhão',
  'Casa',
  'Consultoria',
  'Diesel',
  'Empréstimo',
  'Ferramentas',
  'Frete',
  'Funcionários',
  'Imposto',
  'Implementos',
  'Máquinas',
  'Motorista',
  'Óleos',
  'Outros Produtos',
  'Peças',
  'Safrista',
  'Salários',
  'Serviços Agronômicos',
  'Uniformes',
].sort()

export const TipoDespesaField: React.FC = () => {
  const { register } = useFormContext()

  return (
    <FormControl>
      <FormLabel>Despesa:</FormLabel>
      <Select {...register('tipoDespesa')} placeholder="Selecione o tipo de despesa">
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
