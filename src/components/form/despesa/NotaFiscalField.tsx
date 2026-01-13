import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { CloseIcon } from '@chakra-ui/icons'

export const NotaFiscalField: React.FC = () => {
  const { setValue } = useFormContext()
  const [notas, setNotas] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const novos = Array.from(files).map((f) => f.name)
      const atualizados = [...notas, ...novos]
      setNotas(atualizados)
      setValue('notaFiscal', atualizados)
    }
  }

  const removerNota = (nome: string) => {
    const atualizados = notas.filter((f) => f !== nome)
    setNotas(atualizados)
    setValue('notaFiscal', atualizados)
  }

  return (
    <FormControl>
      <FormLabel>Anexar Nota Fiscal</FormLabel>
      <Input
        type="file"
        accept=".pdf,.jpg,.png"
        multiple
        onChange={handleFileChange}
      />
      <VStack mt={2} align="start">
        {notas.map((nome) => (
          <HStack key={nome}>
            <Text>{nome}</Text>
            <IconButton
              icon={<CloseIcon />}
              size="xs"
              aria-label="Remover"
              onClick={() => removerNota(nome)}
              colorScheme="red"
            />
          </HStack>
        ))}
      </VStack>
    </FormControl>
  )
}
