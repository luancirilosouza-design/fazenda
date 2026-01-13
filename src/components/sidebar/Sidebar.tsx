// src/components/sidebar/Sidebar.tsx

import React, { useState } from 'react'
import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'

const Sidebar: React.FC = () => {
  // controle de dropdowns
  const [isFazendasExpanded, setIsFazendasExpanded] = useState(false)
  const [isEmpresasExpanded, setIsEmpresasExpanded] = useState(false)
  const [isProdutosExpanded, setIsProdutosExpanded] = useState(false)
  const [isEstoqueExpanded, setIsEstoqueExpanded] = useState(false)
  const [isDespesasExpanded, setIsDespesasExpanded] = useState(false)
  const [isFuncionariosExpanded, setIsFuncionariosExpanded] = useState(false)
  const [isMaquinariosExpanded, setIsMaquinariosExpanded] = useState(false) // ← novo estado

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const activeColor = useColorModeValue('brand.500', 'brand.200')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      as="nav"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      w="250px"
      p="4"
      h="100vh"
    >
      <VStack align="start" spacing={1}>
        {/* Fazendas */}
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="2"
          py="2"
          borderRadius="md"
          _hover={{ bg: hoverBg, cursor: 'pointer' }}
          onClick={() => setIsFazendasExpanded(prev => !prev)}
        >
          <Text fontWeight="bold">Fazendas</Text>
          {isFazendasExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Box>
        {isFazendasExpanded && (
          <VStack align="start" pl="4" spacing={1} mt="1">
            <NavLink to="/cadastrar-fazenda" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Cadastrar Fazenda
                </Text>
              )}
            </NavLink>
            <NavLink to="/listar-fazendas" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Listar Fazendas
                </Text>
              )}
            </NavLink>
          </VStack>
        )}

        {/* Empresas/Distribuidoras */}
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="2"
          py="2"
          borderRadius="md"
          _hover={{ bg: hoverBg, cursor: 'pointer' }}
          onClick={() => setIsEmpresasExpanded(prev => !prev)}
        >
          <Text fontWeight="bold">Empresas/Distribuidoras</Text>
          {isEmpresasExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Box>
        {isEmpresasExpanded && (
          <VStack align="start" pl="4" spacing={1} mt="1">
            <NavLink to="/cadastrar-empresa" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Cadastrar
                </Text>
              )}
            </NavLink>
            <NavLink to="/listar-empresas" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Listar
                </Text>
              )}
            </NavLink>
          </VStack>
        )}

        {/* Produtos */}
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="2"
          py="2"
          borderRadius="md"
          _hover={{ bg: hoverBg, cursor: 'pointer' }}
          onClick={() => setIsProdutosExpanded(prev => !prev)}
        >
          <Text fontWeight="bold">Produtos</Text>
          {isProdutosExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Box>
        {isProdutosExpanded && (
          <VStack align="start" pl="4" spacing={1} mt="1">
            <NavLink to="/cadastrar-produto" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Cadastrar Produto
                </Text>
              )}
            </NavLink>
            <NavLink to="/listar-produtos" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Listar Produtos
                </Text>
              )}
            </NavLink>
          </VStack>
        )}

        {/* Estoque */}
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="2"
          py="2"
          borderRadius="md"
          _hover={{ bg: hoverBg, cursor: 'pointer' }}
          onClick={() => setIsEstoqueExpanded(prev => !prev)}
        >
          <Text fontWeight="bold">Estoque</Text>
          {isEstoqueExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Box>
        {isEstoqueExpanded && (
          <VStack align="start" pl="4" spacing={1} mt="1">
            <NavLink to="/cadastrar-estoque" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Cadastrar Estoque
                </Text>
              )}
            </NavLink>
            <NavLink to="/listar-estoque" end>
              {({ isActive }) => (
                <Text
                  py="1"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                >
                  Listar Estoque
                </Text>
              )}
            </NavLink>
          </VStack>
        )}
      </VStack>

      {/* Despesas Extras */}
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="2"
        py="2"
        borderRadius="md"
        _hover={{ bg: hoverBg, cursor: 'pointer' }}
        onClick={() => setIsDespesasExpanded(prev => !prev)}
      >
        <Text fontWeight="bold">Despesas Extras</Text>
        {isDespesasExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </Box>
      {isDespesasExpanded && (
        <VStack align="start" pl="4" spacing={1} mt="1">
          <NavLink to="/cadastrar-despesas" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Cadastrar Despesas
              </Text>
            )}
          </NavLink>
          <NavLink to="/listar-despesas" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Listar Despesas
              </Text>
            )}
          </NavLink>
        </VStack>
      )}

      {/* Funcionários */}
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="2"
        py="2"
        borderRadius="md"
        _hover={{ bg: hoverBg, cursor: 'pointer' }}
        onClick={() => setIsFuncionariosExpanded(prev => !prev)}
      >
        <Text fontWeight="bold">Funcionários</Text>
        {isFuncionariosExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </Box>
      {isFuncionariosExpanded && (
        <VStack align="start" pl="4" spacing={1} mt="1">
          <NavLink to="/cadastrar-funcionario" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Cadastrar Funcionário
              </Text>
            )}
          </NavLink>
          <NavLink to="/listar-funcionarios" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Listar Funcionários
              </Text>
            )}
          </NavLink>
        </VStack>
      )}

      {/* Maquinário */}
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="2"
        py="2"
        borderRadius="md"
        _hover={{ bg: hoverBg, cursor: 'pointer' }}
        onClick={() => setIsMaquinariosExpanded(prev => !prev)}
      >
        <Text fontWeight="bold">Maquinário</Text>
        {isMaquinariosExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </Box>
      {isMaquinariosExpanded && (
        <VStack align="start" pl="4" spacing={1} mt="1">
          <NavLink to="/cadastrar-maquinario" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Cadastrar Maquinário
              </Text>
            )}
          </NavLink>
          <NavLink to="/listar-maquinarios" end>
            {({ isActive }) => (
              <Text
                py="1"
                fontWeight={isActive ? 'bold' : 'normal'}
                color={isActive ? activeColor : undefined}
              >
                Listar Maquinários
              </Text>
            )}
          </NavLink>
        </VStack>
      )}
    </Box>
  )
}

export default Sidebar
