import React, { useState } from 'react'
import { MaquinarioContext } from './MaquinarioContext'
import type { MaquinarioData } from './maquinarioTypes'

export const MaquinarioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [maquinarios, setMaquinarios] = useState<MaquinarioData[]>([])

  const addMaquinario = (data: MaquinarioData) =>
    setMaquinarios(prev => [...prev, data])

  const updateMaquinario = (data: MaquinarioData) =>
    setMaquinarios(prev => prev.map(m => (m.id === data.id ? data : m)))

  const deleteMaquinario = (id: number) =>
    setMaquinarios(prev => prev.filter(m => m.id !== id))

  return (
    <MaquinarioContext.Provider
      value={{ maquinarios, addMaquinario, updateMaquinario, deleteMaquinario }}
    >
      {children}
    </MaquinarioContext.Provider>
  )
}
