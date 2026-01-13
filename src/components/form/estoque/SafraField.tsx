import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

const SafraField = () => {
  const { watch, setValue } = useFormContext()
  const safra = watch('safra')

  return (
    <FormControl mb="4">
      <FormLabel>Safra:</FormLabel>
      <ButtonGroup isAttached>
        <Button
          variant={safra === 'Safra' ? 'solid' : 'outline'}
          colorScheme="green"
          onClick={() => setValue('safra', 'Safra')}
        >
          Safra
        </Button>
        <Button
          variant={safra === 'Safrinha' ? 'solid' : 'outline'}
          colorScheme="green"
          onClick={() => setValue('safra', 'Safrinha')}
        >
          Safrinha
        </Button>
      </ButtonGroup>
      {safra && (
        <Text mt="2" fontWeight="semibold">
          Safra selecionada: <em>{safra}</em>
        </Text>
      )}
    </FormControl>
  )
}

export default SafraField
