// src/components/sidebar/SubMenu.tsx

import React, { useState } from 'react'
import {
  Box,
  VStack,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface Item {
  to: string
  label: string
}

interface Props {
  icon?: React.ReactNode
  label: string
  items?: Item[]
  children?: React.ReactNode
}

const SubMenu: React.FC<Props> = ({ icon, label, items, children }) => {
  const [open, setOpen] = useState(false)
  const activeColor = useColorModeValue('brand.500', 'brand.200')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="4"
        py="2"
        borderRadius="md"
        _hover={{ bg: hoverBg, cursor: 'pointer' }}
        onClick={() => setOpen(prev => !prev)}
      >
        <Box display="flex" alignItems="center">
          {icon}
          <Text ml="2" fontWeight="bold">
            {label}
          </Text>
        </Box>

        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </Box>

      {open && (
        <VStack spacing="2" align="start" pl="6" mt="1">
          {items?.map(item => (
            <NavLink key={item.to} to={item.to} end>
              {({ isActive }) => (
                <ChakraLink
                  w="100%"
                  py="2"
                  px="4"
                  borderRadius="md"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  color={isActive ? activeColor : undefined}
                  _hover={{ textDecoration: 'none', color: activeColor }}
                >
                  {item.label}
                </ChakraLink>
              )}
            </NavLink>
          ))}
          {children}
        </VStack>
      )}
    </>
  )
}

export default SubMenu
