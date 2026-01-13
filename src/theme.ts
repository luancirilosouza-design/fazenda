import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      500: '#4f46e5',
      600: '#4338ca',
    },
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 'bold' },
      defaultProps: { colorScheme: 'brand' },
    },
  },
})
