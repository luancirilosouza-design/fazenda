// src/components/sidebar/MenuEstoque.tsx
import MenuItem from './MenuItem'


const MenuEstoque = () => {
  return (
    <>
      <MenuItem to="/cadastrar-estoque" label="Cadastrar Estoque" />
      <MenuItem to="/listar-estoque" label="Listar Estoque" />
    </>
  );
};

export default MenuEstoque;
