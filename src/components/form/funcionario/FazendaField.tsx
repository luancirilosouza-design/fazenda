// src/components/form/funcionario/FazendaField.tsx
import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useFormContext } from 'react-hook-form'
import { useFazenda } from '../../../context/useFazenda'

export default function FazendaField() {
  const { register, setValue, watch } = useFormContext()
  const { fazendas } = useFazenda()

  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectedFazenda = watch('fazenda')

  const filteredFazendas = fazendas.filter(f =>
  f.nome.toLowerCase().includes(searchTerm.toLowerCase())
)

  const handleSelect = (nome: string) => {
    setValue('fazenda', nome)
    setSearchTerm('')
    setShowDropdown(false)
  }

  return (
    <FormControl mb="4">
      <FormLabel>Fazenda</FormLabel>
      <InputGroup>
        <Input
          {...register('fazenda')}
          value={searchTerm || selectedFazenda || ''}
          onChange={e => {
            setSearchTerm(e.target.value)
            setShowDropdown(true)
          }}
          placeholder="Digite o nome da fazenda"
        />
        <InputRightElement>
          <IconButton
            aria-label="Buscar fazendas"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => setShowDropdown(prev => !prev)}
          />
        </InputRightElement>
      </InputGroup>

      {showDropdown && filteredFazendas.length > 0 && (
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          mt="2"
          maxH="200px"
          overflowY="auto"
          bg="white"
          zIndex="10"
          position="absolute"
          w="full"
        >
          <List spacing={1}>
            {filteredFazendas.map(f => (
              <ListItem
                key={f.id}
                px="3"
                py="2"
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleSelect(f.nome)}
              >
                {f.nome}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {selectedFazenda && (
        <Text mt="2" fontSize="sm" color="gray.600">
          Fazenda selecionada: <strong>{selectedFazenda}</strong>
        </Text>
      )}
    </FormControl>
  )
}
