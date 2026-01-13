// src/components/sidebar/MenuItem.tsx
import React from 'react'
import { Link, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

interface Props {
  to: string
  children: React.ReactNode
}

const MenuItem: React.FC<Props> = ({ to, children }) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  const activeColor = useColorModeValue('blue.600', 'blue.300')

  return (
    <li>
      <Link
        as={NavLink}
        to={to}
        w="100%"
        p="2"
        borderRadius="md"
        _hover={{ textDecoration: 'none', bg: hoverBg }}
        _activeLink={{ color: activeColor, fontWeight: 'bold' }}
      >
        {children}
      </Link>
    </li>
  )
}

export default MenuItem
