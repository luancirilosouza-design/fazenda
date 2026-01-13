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

export const ComprovantePagamentoField: React.FC = () => {
  const { setValue } = useFormContext()
  const [comprovantes, setComprovantes] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const novos = Array.from(files).map((f) => f.name)
      const atualizados = [...comprovantes, ...novos]
      setComprovantes(atualizados)
      setValue('comprovantesPagamento', atualizados)
    }
  }

  const removerComprovante = (nome: string) => {
    const atualizados = comprovantes.filter((f) => f !== nome)
    setComprovantes(atualizados)
    setValue('comprovantesPagamento', atualizados)
  }

  return (
    <FormControl>
      <FormLabel>Anexar Comprovante de pagamento</FormLabel>
      <Input
        type="file"
        accept=".pdf,.jpg,.png"
        multiple
        onChange={handleFileChange}
      />
      <VStack mt={2} align="start">
        {comprovantes.map((nome) => (
          <HStack key={nome}>
            <Text>{nome}</Text>
            <IconButton
              icon={<CloseIcon />}
              size="xs"
              aria-label="Remover"
              onClick={() => removerComprovante(nome)}
              colorScheme="red"
            />
          </HStack>
        ))}
      </VStack>
    </FormControl>
  )
}
