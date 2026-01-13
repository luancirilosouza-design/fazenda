// src/pages/CadastrarFuncionario.tsx
import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { useFuncionarios } from '../context/useFuncionarios'
import { IDField, FazendaField, NomeField, DataNascimentoField, FuncaoField, SalarioField, DataEfetivacaoField, TamanhoUniformeField, } from '../components/form/funcionario'

export default function CadastrarFuncionario() {
  const { addFuncionario, funcionarios } = useFuncionarios()
  const nextId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1

  const methods = useForm({
    defaultValues: {
      id: nextId,
      fazenda: '',
      nome: '',
      dataNascimento: '',
      funcao: '',
      salarioAtual: '',
      dataEfetivacao: '',
      camiseta: '',
      calca: '',
      calcado: '',
    },
  })

  const onSubmit = methods.handleSubmit(data => {
    addFuncionario(data)
    methods.reset()
  })

  return (
    <Box p="4">
      <Heading mb="4">Cadastrar Funcionário</Heading>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <IDField />
          <FazendaField />
          <NomeField />
          <DataNascimentoField />
          <FuncaoField />
          <SalarioField />
          <DataEfetivacaoField />
          <TamanhoUniformeField />
          {/* Outros campos virão depois... */}
          <Button mt="4" colorScheme="blue" type="submit">
            Salvar Funcionário
          </Button>
        </form>
      </FormProvider>
    </Box>
  )
}
