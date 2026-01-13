import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { CloseIcon } from '@chakra-ui/icons'

export const FormaPagamentoDetalhadoField: React.FC = () => {
  const { register, setValue, watch } = useFormContext()
  const forma = watch('formaPagamento')
  const [anexos, setAnexos] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const novos = Array.from(files).map((f) => f.name)
      setAnexos((prev) => [...prev, ...novos])
      setValue('anexosBoleto', [...anexos, ...novos])
    }
  }

  const removerAnexo = (nome: string) => {
    const atualizados = anexos.filter((f) => f !== nome)
    setAnexos(atualizados)
    setValue('anexosBoleto', atualizados)
  }

  return (
    <FormControl>
      <FormLabel>Forma de Pagamento:</FormLabel>
      <ButtonGroup isAttached mb="4">
        <Button
          colorScheme={forma === 'pix' ? 'green' : 'gray'}
          onClick={() => setValue('formaPagamento', 'pix')}
        >
          Pix
        </Button>
        <Button
          colorScheme={forma === 'boleto' ? 'blue' : 'gray'}
          onClick={() => setValue('formaPagamento', 'boleto')}
        >
          Boleto
        </Button>
        <Button
          colorScheme={forma === 'transferencia' ? 'purple' : 'gray'}
          onClick={() => setValue('formaPagamento', 'transferencia')}
        >
          Transferência Bancária
        </Button>
      </ButtonGroup>

      {forma === 'pix' && (
        <Input
          {...register('chavePix')}
          placeholder="Digite a chave Pix"
        />
      )}

      {forma === 'boleto' && (
        <>
          <FormLabel>Anexar Boleto</FormLabel>
          <Input
            type="file"
            accept=".pdf,.jpg,.png"
            multiple
            onChange={handleFileChange}
          />
          <VStack mt={2} align="start">
            {anexos.map((nome) => (
              <HStack key={nome}>
                <Text>{nome}</Text>
                <IconButton
                  icon={<CloseIcon />}
                  size="xs"
                  aria-label="Remover"
                  onClick={() => removerAnexo(nome)}
                  colorScheme="red"
                />
              </HStack>
            ))}
          </VStack>
        </>
      )}

      {forma === 'transferencia' && (
        <VStack spacing={3} mt={2}>
          <Input {...register('banco')} placeholder="Banco" />
          <Input {...register('agencia')} placeholder="Agência" />
          <Input {...register('conta')} placeholder="Conta" />
        </VStack>
      )}
    </FormControl>
  )
}
