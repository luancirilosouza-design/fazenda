import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'

type FileItem = {
  name: string
  file: File
}

const ComprovanteField = () => {
  const { setValue } = useFormContext()
  const [files, setFiles] = useState<FileItem[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const fileList: FileItem[] = Array.from(selectedFiles).map(file => ({
      name: file.name,
      file,
    }))

    const updatedFiles = [...files, ...fileList]
    setFiles(updatedFiles)
    setValue('comprovantes', updatedFiles.map(f => f.file))
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    setValue('comprovantes', updatedFiles.map(f => f.file))
  }

  return (
    <FormControl mb="4">
      <FormLabel>Anexar Comprovante de Pagamento:</FormLabel>
      <Input
        type="file"
        multiple
        accept=".pdf, .jpg, .png"
        onChange={handleFileChange}
      />
      <VStack align="start" mt="2" spacing="1">
        {files.map((file, index) => (
          <Box
            key={index}
            bg="gray.100"
            p="2"
            borderRadius="md"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="sm">{file.name}</Text>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              colorScheme="red"
              aria-label="Remover arquivo"
              onClick={() => removeFile(index)}
            />
          </Box>
        ))}
      </VStack>
    </FormControl>
  )
}

export default ComprovanteField
