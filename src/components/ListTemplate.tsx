// src/components/ListTemplate.tsx

import React, { useState, useMemo } from 'react'
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'
import { DataTable } from './DataTable'
import type { ColumnDef } from '../types'

interface ListTemplateProps<T extends { id: number }> {
  data: T[]
  columns: ColumnDef<T>[]
  pageSize?: number
  FormFields: React.FC
  onDelete: (row: T) => void
  onSave: (item: T) => void
}

export function ListTemplate<T extends { id: number }>({
  data,
  columns,
  pageSize = 10,
  FormFields,
  onDelete,
  onSave,
}: ListTemplateProps<T>) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // paginação
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(data.length / pageSize)
  const paged = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  )

  // form sem defaultValues fixos
  const methods = useForm<T>()

  // abre o modal e popula o form
  const handleEdit = (row: T) => {
    methods.reset(row)
    onOpen()
  }

  // quando salvar
  const handleSubmit: SubmitHandler<T> = item => {
    onSave(item)
    toast({ title: `#${item.id} salvo.`, status: 'success', duration: 2000 })
    onClose()
  }

  return (
    <Box p="4">
      <DataTable columns={columns} data={paged} onEdit={handleEdit} onDelete={onDelete} />

      <HStack mt="4" spacing="2" justify="center">
        <Button size="sm" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Anterior
        </Button>
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? 'solid' : 'outline'}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button size="sm" onClick={() => setPage(p => Math.min(p + 1, pageCount))} disabled={page === pageCount}>
          Próximo
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...methods}>
              <form id="edit-form" onSubmit={methods.handleSubmit(handleSubmit)}>
                <VStack spacing="4" align="stretch">
                  <FormFields />
                </VStack>
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" type="submit" form="edit-form">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
