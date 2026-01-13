// src/App.tsx

import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'

import ProtectedLayout from './components/auth/ProtectedLayout'
import Login from './pages/Login'

import { AuthProvider } from './context/AuthContext'
import Sidebar from './components/sidebar/Sidebar' // (não será usado diretamente aqui, pode remover se quiser)

import { EmpresaProvider } from './context/EmpresaProvider'
import { ProdutoProvider } from './context/ProdutoProvider'
import { EstoqueProvider } from './context/EstoqueProvider'
import { DespesasProvider } from './context/DespesasProvider'
import { FuncionarioProvider } from './context/FuncionarioProvider'
import { MaquinarioProvider } from './context/MaquinarioProvider'

import CadastrarFazenda from './pages/CadastrarFazenda'
import ListarFazendas from './pages/ListarFazendas'

import CadastrarEmpresa from './pages/CadastrarEmpresa'
import ListarEmpresas from './pages/ListarEmpresas'

import CadastrarProduto from './pages/CadastrarProduto'
import ListarProdutos from './pages/ListarProdutos'

import CadastrarEstoque from './pages/CadastrarEstoque'
import ListarEstoque from './pages/ListarEstoque'

import CadastrarDespesas from './pages/CadastrarDespesas'
import ListarDespesas from './pages/ListarDespesasExtras'

import CadastrarFuncionario from './pages/CadastrarFuncionario'
import ListarFuncionarios from './pages/ListarFuncionarios'

import CadastrarMaquinario from './pages/CadastrarMaquinario'
import ListarMaquinarios from './pages/ListarMaquinarios'

const App: React.FC = () => {
  const mainBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <AuthProvider>
      <EmpresaProvider>
        <ProdutoProvider>
          <EstoqueProvider>
            <DespesasProvider>
              <FuncionarioProvider>
                <MaquinarioProvider>
                  <Routes>
                    {/* Público */}
                    <Route path="/login" element={<Login />} />

                    {/* Protegido */}
                    <Route element={<ProtectedLayout />}>
                      <Route
                        path="/"
                        element={<Box p="4" bg={mainBg}>Bem-vindo! Selecione uma opção no menu</Box>}
                      />

                      {/* Fazendas */}
                      <Route path="/cadastrar-fazenda" element={<CadastrarFazenda />} />
                      <Route path="/listar-fazendas" element={<ListarFazendas />} />

                      {/* Empresas */}
                      <Route path="/cadastrar-empresa" element={<CadastrarEmpresa />} />
                      <Route path="/listar-empresas" element={<ListarEmpresas />} />

                      {/* Produtos */}
                      <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
                      <Route path="/listar-produtos" element={<ListarProdutos />} />

                      {/* Estoque */}
                      <Route path="/cadastrar-estoque" element={<CadastrarEstoque />} />
                      <Route path="/listar-estoque" element={<ListarEstoque />} />

                      {/* Despesas */}
                      <Route path="/cadastrar-despesas" element={<CadastrarDespesas />} />
                      <Route path="/listar-despesas" element={<ListarDespesas />} />

                      {/* Funcionários */}
                      <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
                      <Route path="/listar-funcionarios" element={<ListarFuncionarios />} />

                      {/* Maquinário */}
                      <Route path="/cadastrar-maquinario" element={<CadastrarMaquinario />} />
                      <Route path="/listar-maquinarios" element={<ListarMaquinarios />} />

                      {/* Catch-all */}
                      <Route path="*" element={<Box p="4">Página não encontrada</Box>} />
                    </Route>
                  </Routes>
                </MaquinarioProvider>
              </FuncionarioProvider>
            </DespesasProvider>
          </EstoqueProvider>
        </ProdutoProvider>
      </EmpresaProvider>
    </AuthProvider>
  )
}

export default App
