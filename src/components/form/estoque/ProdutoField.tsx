import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useProduto } from '../../../context/ProdutoContext'

const ProdutoField = () => {
  const { produtos } = useProduto()
  const { setValue } = useFormContext()

  const [busca, setBusca] = useState('')
  const [dropdownAberto, setDropdownAberto] = useState(false)
  const [selecionados, setSelecionados] = useState<string[]>([])

  const abrirDropdown = () => {
    setDropdownAberto(true)
  }

  const filtrarProdutos = (texto: string) => {
    setBusca(texto)
    setDropdownAberto(true)
  }

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const selecionarProduto = (nome: string) => {
    if (!selecionados.includes(nome)) {
      const atualizados = [...selecionados, nome]
      setSelecionados(atualizados)
      setValue('produtos', atualizados)
    }
    setBusca('')
    setDropdownAberto(false)
  }

  const removerProduto = (nome: string) => {
    const atualizados = selecionados.filter(p => p !== nome)
    setSelecionados(atualizados)
    setValue('produtos', atualizados)
  }

  return (
    <FormControl mb="4">
      <FormLabel>Produto:</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <IconButton
            aria-label="Abrir sugestão de produtos"
            icon={<SearchIcon />}
            size="sm"
            onClick={abrirDropdown}
          />
        </InputLeftElement>
        <Input
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={e => filtrarProdutos(e.target.value)}
        />
      </InputGroup>

      {dropdownAberto && produtosFiltrados.length > 0 && (
        <Box
          mt="2"
          border="1px solid #ccc"
          borderRadius="md"
          maxHeight="150px"
          overflowY="auto"
          bg="white"
          zIndex={10}
          position="absolute"
          width="full"
        >
          {produtosFiltrados.map(prod => (
            <Box
              key={prod.id}
              px="3"
              py="2"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={() => selecionarProduto(prod.nome)}
            >
              {prod.nome}
            </Box>
          ))}
        </Box>
      )}

      {selecionados.length > 0 && (
        <VStack align="start" mt="3" spacing="2">
          {selecionados.map(nome => (
            <Tag key={nome} size="md" borderRadius="full" colorScheme="green">
              <TagLabel>{nome}</TagLabel>
              <TagCloseButton onClick={() => removerProduto(nome)} />
            </Tag>
          ))}
        </VStack>
      )}
    </FormControl>
  )
}

export default ProdutoField
