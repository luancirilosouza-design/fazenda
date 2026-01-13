// src/context/useFuncionarios.ts
import { useContext } from 'react'
import { FuncionarioContext } from './FuncionarioContext'

export const useFuncionarios = () => useContext(FuncionarioContext)
