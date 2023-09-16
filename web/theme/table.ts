import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  thead: {
    backgroundColor: '#171717',
  },
  th: {
    fontFamily: 'inherit',
    fontWeight: '700',
    color: 'white',
    borderBottomColor: '#121212',
  },
  tbody: {
    tr: {
      '&:nth-of-type(odd)': {
        'th, td': {
          borderBottomWidth: '0px',
          borderColor: '#1d1d1d',
        },
        td: {
          background: '#1d1d1d',
        },
      },
      td: {
        borderBottomWidth: '0px',
      },
    },
  },
});

export default defineMultiStyleConfig({
  variants: { striped: baseStyle },
});
