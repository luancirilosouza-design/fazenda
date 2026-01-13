// src/components/sidebar/MenuToggle.tsx

import React from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
  open: boolean
  onToggle: () => void
}

const MenuToggle: React.FC<Props> = ({ open, onToggle }) => {
  const color = useColorModeValue('gray.600', 'gray.200')

  return (
    <IconButton
      aria-label="Toggle menu"
      icon={open ? <CloseIcon /> : <HamburgerIcon />}
      onClick={onToggle}
      mb="4"
      variant="outline"
      color={color}
    />
  )
}

export default MenuToggle
