// src/pages/ListarFuncionarios.tsx
import React from 'react'
import { useFuncionarios } from '../context/useFuncionarios'
import { ListTemplate } from '../components/ListTemplate'
import type { FuncionarioData } from '../context/funcionarioTypes'
import {
  FazendaField,
  NomeField,
  DataNascimentoField,
  FuncaoField,
  SalarioField,
  DataEfetivacaoField,
  TamanhoUniformeField,
} from '../components/form/funcionario'

export default function ListarFuncionarios() {
  const { funcionarios, deleteFuncionario, updateFuncionario } = useFuncionarios()

  const columns = [
    { Header: 'ID', accessor: 'id', filterable: true },
    { Header: 'Fazenda', accessor: 'fazenda', filterable: true },
    { Header: 'Nome', accessor: 'nome', filterable: true },
    {
      Header: 'Data de Nascimento',
      accessor: 'dataNascimento',
      filterable: true,
    },
    { Header: 'Função', accessor: 'funcao', filterable: true },
    {
      Header: 'Salário',
      accessor: 'salarioAtual',   // ← corrigi aqui para bater com FuncionarioData
      filterable: true,
      // opcional: formatar prefixo
      // Cell: ({ value }: { value: string }) => <span>R$ {value}</span>,
    },
    {
      Header: 'Data de Efetivação',
      accessor: 'dataEfetivacao',
      filterable: true,
    },
    { Header: 'Camiseta', accessor: 'camiseta', filterable: true },
    { Header: 'Calça', accessor: 'calca', filterable: true },
    { Header: 'Calçado', accessor: 'calcado', filterable: true },
  ]

  const FormFields = () => (
    <>
      <FazendaField />
      <NomeField />
      <DataNascimentoField />
      <FuncaoField />
      <SalarioField />
      <DataEfetivacaoField />
      <TamanhoUniformeField />
      {/* Outros campos virão depois... */}
    </>
  )

  return (
    <ListTemplate<FuncionarioData>
      data={funcionarios}
      columns={columns}
      pageSize={10}
      onDelete={deleteFuncionario}
      onSave={updateFuncionario}
      FormFields={FormFields}
    />
  )
}
