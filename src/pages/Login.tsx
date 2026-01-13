// src/pages/Login.tsx
import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await signIn(email.trim(), password)
      toast({ title: 'Login realizado', status: 'success', duration: 1500 })
      navigate('/', { replace: true })
    } catch (err: any) {
      toast({
        title: 'Falha no login',
        description: err?.message ?? 'Verifique email e senha.',
        status: 'error',
        duration: 2500,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box w="100%" maxW="420px" p="8" bg="white" borderRadius="md" boxShadow="md">
        <Heading size="md" mb="6">Entrar</Heading>

        <form onSubmit={onSubmit}>
          <FormControl mb="4" isRequired>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@empresa.com" />
          </FormControl>

          <FormControl mb="6" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </FormControl>

          <Button colorScheme="blue" type="submit" w="100%" isLoading={isSubmitting}>
            Entrar
          </Button>

          <Text mt="4" fontSize="sm" color="gray.500">
            Use o email e senha cadastrados no sistema.
          </Text>
        </form>
      </Box>
    </Flex>
  )
}
