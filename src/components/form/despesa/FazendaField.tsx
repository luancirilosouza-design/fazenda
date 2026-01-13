// C:\TI\PROJETOS_EM_ANDAMENTO\fazenda\src\components\form\despesa\FazendaField.tsx

import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  List,
  ListItem,
  Box,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { SearchIcon } from '@chakra-ui/icons'
import { useFazenda } from '../../../context/useFazenda'

export const FazendaField: React.FC = () => {
  const { register, setValue, watch } = useFormContext()
  const fazendaSelecionada = watch('fazenda')
  const { fazendas } = useFazenda()

  const [query, setQuery] = useState('')
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)

  const sugestoes = fazendas.filter(f =>
    f.id.toString().includes(query)
  )

  const selecionarFazenda = (id: number) => {
    setValue('fazenda', id.toString())
    setQuery(id.toString())
    setMostrarSugestoes(false)
  }

  return (
    <FormControl>
      <FormLabel>Fazenda</FormLabel>
      <InputGroup>
        <Input
          {...register('fazenda')}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setMostrarSugestoes(true)
          }}
          placeholder="Digite o ID da fazenda"
        />
        <InputRightElement>
          <IconButton
            aria-label="Buscar fazendas"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => setMostrarSugestoes(true)}
          />
        </InputRightElement>
      </InputGroup>

      {mostrarSugestoes && sugestoes.length > 0 && (
        <Box border="1px solid #ccc" borderRadius="md" mt="2" maxH="150px" overflowY="auto">
          <List spacing={1}>
            {sugestoes.map(f => (
              <ListItem
                key={f.id}
                px="3"
                py="2"
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => selecionarFazenda(f.id)}
              >
                Fazenda #{f.id}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {fazendaSelecionada && (
        <Text mt="2" fontSize="sm" color="gray.600">
          Fazenda selecionada: <strong>#{fazendaSelecionada}</strong>
        </Text>
      )}
    </FormControl>
  )
}
