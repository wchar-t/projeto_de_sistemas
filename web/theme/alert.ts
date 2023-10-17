import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import { AlertProps } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status } = props;

  const errorBase = status === 'error' && {
    container: {
      backgroundColor: 'rgba(254, 178, 178, 0.16)',
    },
  }

  return {
    ...errorBase,
  }
});

export default defineMultiStyleConfig({
  baseStyle,
});
