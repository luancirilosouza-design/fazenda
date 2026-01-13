import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'

const DataVencimentoField = () => {
  const { setValue } = useFormContext()
  const [date, setDate] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDate(value)
    setValue('dataVencimento', value)
  }

  return (
    <FormControl mb="4">
      <FormLabel>Data de Vencimento:</FormLabel>
      <Input
        type="date"
        value={date}
        onChange={handleChange}
      />
    </FormControl>
  )
}

export default DataVencimentoField
