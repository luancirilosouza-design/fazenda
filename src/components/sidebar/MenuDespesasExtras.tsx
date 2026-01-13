// src/components/sidebar/MenuDespesasExtras.tsx

import React from 'react'
import { MdAttachMoney } from 'react-icons/md'
import SubMenu from './SubMenu'

const MenuDespesasExtras: React.FC = () => {
  return (
    <SubMenu
      icon={<MdAttachMoney />}
      label="Despesas Extras"
      items={[
        { label: 'Cadastrar Despesas', to: '/despesas/cadastrar' },
        { label: 'Listar Despesas',     to: '/despesas/listar'   },
      ]}
    />
  )
}

export default MenuDespesasExtras
