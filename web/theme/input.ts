import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    backgroundColor: '#171717',
    border: '#131313',
  },
});

export default defineMultiStyleConfig({
  variants: { outline: baseStyle },
});
