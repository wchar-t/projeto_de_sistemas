import { selectAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    border: 0,
    background: '#171717',
  },
})

export default defineMultiStyleConfig({
  variants: { outline: baseStyle },
});
