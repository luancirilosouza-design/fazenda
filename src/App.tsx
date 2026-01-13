// src/App.tsx

import React from 'react'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'

// Sidebar
import Sidebar from './components/sidebar/Sidebar'

// Fazendas
import CadastrarFazenda from './pages/CadastrarFazenda'
import ListarFazendas from './pages/ListarFazendas'

// Empresas/Distribuidoras
import { EmpresaProvider } from './context/EmpresaProvider'
import CadastrarEmpresa from './pages/CadastrarEmpresa'
import ListarEmpresas from './pages/ListarEmpresas'

// Produtos
import { ProdutoProvider } from './context/ProdutoProvider'
import CadastrarProduto from './pages/CadastrarProduto'
import ListarProdutos from './pages/ListarProdutos'

// Estoque
import { EstoqueProvider } from './context/EstoqueProvider'
import CadastrarEstoque from './pages/CadastrarEstoque'
import ListarEstoque from './pages/ListarEstoque'

// Despesas Extras
import { DespesasProvider } from './context/DespesasProvider'
import CadastrarDespesas from './pages/CadastrarDespesas'
import ListarDespesas from './pages/ListarDespesasExtras'

// Funcionários
import { FuncionarioProvider } from './context/FuncionarioProvider'
import CadastrarFuncionario from './pages/CadastrarFuncionario'
import ListarFuncionarios from './pages/ListarFuncionarios'

// Maquinário
import { MaquinarioProvider } from './context/MaquinarioProvider'
import CadastrarMaquinario from './pages/CadastrarMaquinario'
import ListarMaquinarios from './pages/ListarMaquinarios'

const App: React.FC = () => {
  const mainBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <EmpresaProvider>
      <ProdutoProvider>
        <EstoqueProvider>
          <DespesasProvider>
            <FuncionarioProvider>
              <MaquinarioProvider> {/* ← Provider do módulo Maquinário */}
                <Flex h="100vh">
                  <Sidebar />

                  <Box
                    as="main"
                    flex="1"
                    p="4"
                    bg={mainBg}
                    overflowY="auto"
                  >
                    <Routes>
                      {/* Home */}
                      <Route
                        path="/"
                        element={<Box p="4">Bem-vindo! Selecione uma opção no menu</Box>}
                      />

                      {/* Fazendas */}
                      <Route path="/cadastrar-fazenda" element={<CadastrarFazenda />} />
                      <Route path="/listar-fazendas" element={<ListarFazendas />} />

                      {/* Empresas/Distribuidoras */}
                      <Route path="/cadastrar-empresa" element={<CadastrarEmpresa />} />
                      <Route path="/listar-empresas" element={<ListarEmpresas />} />

                      {/* Produtos */}
                      <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
                      <Route path="/listar-produtos" element={<ListarProdutos />} />
                      
                      {/* Estoque */}
                      <Route path="/cadastrar-estoque" element={<CadastrarEstoque />} />
                      <Route path="/listar-estoque" element={<ListarEstoque />} />

                      {/* Despesas Extras */}
                      <Route path="/cadastrar-despesas" element={<CadastrarDespesas />} />
                      <Route path="/listar-despesas" element={<ListarDespesas />} />

                      {/* Funcionários */}
                      <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
                      <Route path="/listar-funcionarios" element={<ListarFuncionarios />} />

                      {/* Maquinário */}
                      <Route path="/cadastrar-maquinario" element={<CadastrarMaquinario />} />
                      <Route path="/listar-maquinarios" element={<ListarMaquinarios />} />

                      {/* Catch-all */}
                      <Route
                        path="*"
                        element={<Box p="4">Página não encontrada</Box>}
                      />
                    </Routes>
                  </Box>
                </Flex>
              </MaquinarioProvider>
            </FuncionarioProvider>
          </DespesasProvider>
        </EstoqueProvider>
      </ProdutoProvider>
    </EmpresaProvider>
  )
}

export default App
