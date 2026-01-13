// src/pages/produtos/CadastrarProduto.tsx

import React, { useEffect } from 'react'
import { Box, Heading, VStack, Button, useToast } from '@chakra-ui/react'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'
import { useProduto, type ProductData } from '../context/ProdutoContext'

import IDField from '../components/form/produto/IDField'
import NomeProdutoField from '../components/form/produto/NomeProdutoField'
import IngredienteAtivoField from '../components/form/produto/IngredienteAtivoField'
import CategoriaField from '../components/form/produto/CategoriaField'
import ImagemProdutoField from '../components/form/produto/ImagemProdutoField'
import EmpresaField from '../components/form/produto/EmpresaField'
import ObservacoesField from '../components/form/produto/ObservacoesField'

export default function CadastrarProduto() {
  const { produtos, createProduto } = useProduto()
  const toast = useToast()

  // Calcula o próximo ID (sempre number)
  const nextId =
    produtos.length > 0
      ? Math.max(...produtos.map(p => p.id)) + 1
      : 1

  // Inicializa o form com defaultValues corretamente tipados
  const methods = useForm<ProductData>({
    defaultValues: {
      id: nextId,
      nome: '',
      ingredienteAtivo: '',
      categoria: '',
      imagemProduto: [],
      empresa: '',
      observacoes: '',
    },
  })

  const { handleSubmit, reset, setValue } = methods

  // Sincroniza sempre que a lista mudar
  useEffect(() => {
    setValue('id', nextId)
  }, [nextId, setValue])

  // Handler de submit
  const onSubmit: SubmitHandler<ProductData> = data => {
    createProduto(data)

    toast({
      title: 'Produto cadastrado',
      description: `#${data.id} — ${data.nome}`,
      status: 'success',
      duration: 2000,
    })

    // Reseta todos os campos e já carrega o próximo ID
    reset({
      id: nextId + 1,
      nome: '',
      ingredienteAtivo: '',
      categoria: '',
      imagemProduto: [],
      empresa: '',
      observacoes: '',
    })
  }

  return (
    <Box p="4">
      <Heading mb="4">Cadastrar Produto</Heading>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4" align="stretch">
            <IDField isDisabled />
            <NomeProdutoField />
            <IngredienteAtivoField />
            <CategoriaField />
            <ImagemProdutoField />
            <EmpresaField />
            <ObservacoesField />

            <Button colorScheme="blue" type="submit">
              Salvar
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  )
}
