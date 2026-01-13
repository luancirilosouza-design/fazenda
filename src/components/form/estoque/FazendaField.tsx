import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useFormContext } from 'react-hook-form'
import { useFazenda } from '../../../context/useFazenda'
import { useState } from 'react'

const FazendaField = () => {
  const { fazendas } = useFazenda()
  const { watch, setValue, register } = useFormContext()
  const busca = watch('fazenda')
  const [selecionada, setSelecionada] = useState('')
  const [mostrar, setMostrar] = useState(false)

  const filtradas = fazendas.filter(f =>
    f.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <FormControl mb="4">
      <FormLabel>Fazenda:</FormLabel>
      <InputGroup>
        <Input
          placeholder="Digite o nome da fazenda..."
          {...register('fazenda')}
          onFocus={() => setMostrar(true)}
          onChange={(e) => {
            setValue('fazenda', e.target.value)
            setMostrar(true)
          }}
        />
        <InputRightElement>
          <IconButton
            aria-label="Buscar fazenda"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => setMostrar(true)}
          />
        </InputRightElement>
      </InputGroup>

      {mostrar && filtradas.length > 0 && (
        <List border="1px" borderColor="gray.200" borderRadius="md" mt="2">
          {filtradas.map((f, i) => (
            <ListItem
              key={i}
              px="3"
              py="2"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={() => {
                setValue('fazenda', f.nome)
                setSelecionada(f.nome)
                setMostrar(false)
              }}
            >
              {f.nome}
            </ListItem>
          ))}
        </List>
      )}

      {selecionada && (
        <Text mt="2" fontWeight="semibold">
          Fazenda selecionada: <em>{selecionada}</em>
        </Text>
      )}
    </FormControl>
  )
}

export default FazendaField
