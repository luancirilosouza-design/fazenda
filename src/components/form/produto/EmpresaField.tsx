// src/components/form/produto/EmpresaField.tsx

import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useEmpresa } from '../../../context/EmpresaContext'
import type { ProductData } from '../../../context/ProdutoContext'

const EmpresaField: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductData>()
  const { empresas } = useEmpresa()

  return (
    <FormControl isRequired isInvalid={!!errors.empresa}>
      <FormLabel>Empresa/Distribuidora</FormLabel>
      <Select
        placeholder="Selecione a empresa"
        {...register('empresa', {
          required: 'Escolha uma empresa',
        })}
      >
        {empresas.map(emp => (
          <option key={emp.id} value={emp.nome}>
            {emp.nome}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors.empresa?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default EmpresaField
