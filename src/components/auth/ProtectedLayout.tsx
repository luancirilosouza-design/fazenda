// src/components/auth/ProtectedLayout.tsx
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from '../sidebar/Sidebar'

export default function ProtectedLayout() {
  const { session, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="lg" />
      </Flex>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return (
    <Flex h="100vh">
      <Sidebar />
      <Box as="main" flex="1" p="4" bg="gray.100" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  )
}
