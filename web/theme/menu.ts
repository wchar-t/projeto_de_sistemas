import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  list: {
    backgroundColor: '#171717',
    border: '#131313',
  },
  item: {
    backgroundColor: '#171717',
    _hover: {
      backgroundColor: '#1e1e1e',
    },
  },
});

export default defineMultiStyleConfig({
  baseStyle,
});
