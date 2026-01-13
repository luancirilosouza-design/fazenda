import { createContext } from 'react'
import type { EstoqueContextType } from './estoqueTypes'

export const EstoqueContext = createContext<EstoqueContextType | undefined>(undefined)
