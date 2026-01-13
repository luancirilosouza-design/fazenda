// src/components/sidebar/MenuFuncionarios.tsx

import React from 'react'
import SubMenu from './SubMenu'
import { ChevronRightIcon } from '@chakra-ui/icons'
import MenuItem from './MenuItem'

export default function MenuFuncionarios() {
  return (
    <SubMenu label="Funcionários" icon={<ChevronRightIcon />}>
      <MenuItem to="/cadastrar-funcionario">Cadastrar Funcionário</MenuItem>
      <MenuItem to="/listar-funcionarios">Listar Funcionários</MenuItem>
    </SubMenu>
  )
}
