// src/components/form/maquinario/FazendaField.tsx
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
  const { register, setValue, watch } = useFormContext<{ fazenda: string }>()
  const { fazendas } = useFazenda()

  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selected = watch('fazenda')

  const filtered = fazendas.filter(f =>
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
          value={searchTerm || selected || ''}
          onChange={e => {
            setSearchTerm(e.target.value)
            setShowDropdown(true)
          }}
          placeholder="Digite o nome da fazenda"
        />
        <InputRightElement>
          <IconButton
            aria-label="Buscar fazenda"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => setShowDropdown(prev => !prev)}
          />
        </InputRightElement>
      </InputGroup>

      {showDropdown && filtered.length > 0 && (
        <Box
          position="absolute"
          mt="2"
          w="full"
          maxH="200px"
          overflowY="auto"
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          zIndex="10"
        >
          <List spacing={0}>
            {filtered.map(f => (
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

      {selected && (
        <Text mt="2" fontSize="sm" color="gray.600">
          Fazenda selecionada: <strong>{selected}</strong>
        </Text>
      )}
    </FormControl>
  )
}
