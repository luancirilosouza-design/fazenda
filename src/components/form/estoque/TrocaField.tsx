import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const TrocaField = () => {
  const { watch, setValue } = useFormContext()
  const troca = watch('troca')

  return (
    <FormControl mb="4">
      <FormLabel>Troca em Grão/Sacas?</FormLabel>
      <ButtonGroup isAttached>
        <Button
          variant={troca === 'Sim' ? 'solid' : 'outline'}
          colorScheme="orange"
          onClick={() => setValue('troca', 'Sim')}
        >
          Sim
        </Button>
        <Button
          variant={troca === 'Não' ? 'solid' : 'outline'}
          colorScheme="orange"
          onClick={() => setValue('troca', 'Não')}
        >
          Não
        </Button>
      </ButtonGroup>
      {troca && (
        <Text mt="2" fontWeight="semibold">
          Troca selecionada: <em>{troca}</em>
        </Text>
      )}
    </FormControl>
  )
}

export default TrocaField
