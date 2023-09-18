import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  addon: {
    backgroundColor: '#202020',
    border: 0,
  },
  field: {
    backgroundColor: '#171717',
    border: '#131313',
  },
});

export default defineMultiStyleConfig({
  variants: { outline: baseStyle },
});
