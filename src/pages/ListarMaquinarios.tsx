// src/pages/ListarMaquinarios.tsx
import React from 'react'
import {
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useMaquinarios } from '../context/useMaquinarios'
import { ListTemplate } from '../components/ListTemplate'
import type { MaquinarioData } from '../context/maquinarioTypes'
import {
  IDField,
  FazendaField,
  CodigoIdentificacaoField,
  MarcaField,
  ModeloField,
  AnoField,
  PlacaField,
  NovoUsadoField,
  ProprioArrendadoField,
  AnexarContratoField,
  HorasVerificacaoField,
  ImagemMaquinarioField,
  ObservacoesField,
} from '../components/form/maquinario'

export default function ListarMaquinarios() {
  const { maquinarios, deleteMaquinario, updateMaquinario } = useMaquinarios()

  // Memoize colunas para não recriar a cada render
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id', filterable: true },
      { Header: 'Fazenda', accessor: 'fazenda', filterable: true },
      {
        Header: 'Código Adesivo',
        accessor: 'codigoIdentificacao',
        filterable: true,
      },
      { Header: 'Marca', accessor: 'marca', filterable: true },
      { Header: 'Modelo', accessor: 'modelo', filterable: true },
      { Header: 'Ano', accessor: 'ano', filterable: true },
      { Header: 'Placa', accessor: 'placa', filterable: true },
      { Header: 'Condição', accessor: 'condicao', filterable: true },
      { Header: 'Posse', accessor: 'propriedade', filterable: true },
      {
        Header: 'Contratos',
        accessor: 'contratos',
        filterable: true,
        // Cell opcional para mostrar nomes concatenados:
        // Cell: ({ value }) => value.map((f: File) => f.name).join(', ')
      },
      {
        Header: 'Horas Trabalhadas',
        accessor: 'horasTrabalhadas',
        filterable: true,
      },
      {
        Header: 'Data Verificação',
        accessor: 'dataVerificacao',
        filterable: true,
      },
      {
        Header: 'Imagens',
        accessor: 'imagens',
        filterable: true,
        // Cell opcional:
        // Cell: ({ value }) => value.map((f: File) => f.name).join(', ')
      },
      { Header: 'Observações', accessor: 'observacoes', filterable: true },

      // Coluna de ações
      {
        Header: 'Ações',
        id: 'actions',
        // Não filtrar por essa coluna
        filterable: false,
        Cell: ({ row }) => {
          const record: MaquinarioData = row.original
          return (
            <HStack spacing={2}>
              <IconButton
                aria-label="Excluir"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => deleteMaquinario(record.id)}
              />
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                size="sm"
                onClick={() => row.toggleRowSelected()}
              />
            </HStack>
          )
        },
      },
    ],
    [deleteMaquinario]
  )

  // FormFields para edição inline (inclui todos os campos, até uploads)
  const FormFields = React.useCallback(
    () => (
      <>
        <IDField />
        <FazendaField />
        <CodigoIdentificacaoField />
        <MarcaField />
        <ModeloField />
        <AnoField />
        <PlacaField />
        <NovoUsadoField />
        <ProprioArrendadoField />
        <AnexarContratoField />
        <HorasVerificacaoField />
        <ImagemMaquinarioField />
        <ObservacoesField />
      </>
    ),
    []
  )

  return (
    <ListTemplate<MaquinarioData>
      data={maquinarios}
      columns={columns}
      pageSize={10}
      onDelete={deleteMaquinario}
      onSave={updateMaquinario}
      FormFields={FormFields}
    />
  )
}
