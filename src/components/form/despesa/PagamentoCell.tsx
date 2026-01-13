import React, { useState } from 'react'
import { Button, VStack, HStack, Text, Checkbox } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import type { DespesaData } from '../../../context/DespesasContext'

interface Props {
  value: string
  row: DespesaData
  updateDespesa: (item: DespesaData) => void
}

export const PagamentoCell: React.FC<Props> = ({ value, row, updateDespesa }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Button size="xs" onClick={() => setExpanded(!expanded)}>
        {value} <ChevronDownIcon />
      </Button>
      {expanded && (
        <VStack mt={2} align="start">
          {row.valoresParcelas?.map((valor, i) => (
            <HStack key={i}>
              <Text>{`Parcela ${i + 1}: R$ ${valor}`}</Text>
              <Checkbox
                isChecked={row.parcelasPagas?.[i]}
                onChange={() => {
                  const atualizadas = [...(row.parcelasPagas || [])]
                  atualizadas[i] = !atualizadas[i]
                  updateDespesa({ ...row, parcelasPagas: atualizadas })
                }}
              >
                Paga
              </Checkbox>
            </HStack>
          ))}
        </VStack>
      )}
    </>
  )
}
