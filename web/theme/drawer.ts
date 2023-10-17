import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  header: {
    backgroundColor: '#121212',
  },
  body: {
    backgroundColor: '#121212',
  },
});

export default defineMultiStyleConfig({
  baseStyle,
});
