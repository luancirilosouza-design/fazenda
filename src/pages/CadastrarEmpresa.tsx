// src/pages/empresas/CadastrarEmpresa.tsx

import React from 'react'
import { Box, Heading, Button, useToast, VStack } from '@chakra-ui/react'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'
import { useEmpresa, type EmpresaData } from '../context/EmpresaContext'

import NomeField from '../components/form/empresa/NomeField'
import EmailField from '../components/form/empresa/EmailField'
import TelefoneEmpresaField from '../components/form/empresa/TelefoneEmpresaField'
import CidadeField from '../components/form/empresa/CidadeField'
import VendedorField from '../components/form/empresa/VendedorField'
import TelefoneVendedorField from '../components/form/empresa/TelefoneVendedorField'

export default function CadastrarEmpresa() {
  // Form sem ID
  const methods = useForm<Omit<EmpresaData, 'id'>>()
  const { createEmpresa, empresas } = useEmpresa()
  const toast = useToast()

  const onSubmit: SubmitHandler<Omit<EmpresaData, 'id'>> = data => {
    // Gera nextId
    const nextId =
      empresas.length > 0
        ? Math.max(...empresas.map(e => e.id)) + 1
        : 1

    createEmpresa({ id: nextId, ...data })

    toast({
      title: 'Empresa cadastrada!',
      description: `#${nextId} — ${data.nome}`,
      status: 'success',
      duration: 2000,
    })

    methods.reset()
  }

  return (
    <Box p="4">
      <Heading mb="4">Cadastrar Empresa/Distribuidora</Heading>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VStack spacing="4" align="stretch">
            <NomeField />
            <EmailField />
            <TelefoneEmpresaField />
            <CidadeField />
            <VendedorField />
            <TelefoneVendedorField />

            <Button colorScheme="blue" type="submit">
              Salvar
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  )
}
