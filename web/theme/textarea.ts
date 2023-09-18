import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  backgroundColor: '#171717',
  border: 0,
});

export default defineStyleConfig({
  variants: { outline: baseStyle },
});
