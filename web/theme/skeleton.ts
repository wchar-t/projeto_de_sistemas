import { defineStyle, defineStyleConfig, cssVar } from '@chakra-ui/react';

const startColor = cssVar('skeleton-start-color');
const endColor = cssVar('skeleton-end-color');

const baseStyle = defineStyle({
  [startColor.variable]: '#202020',
  [endColor.variable]: '#292929',
  borderRadius: 6,
})

export default defineStyleConfig({
  baseStyle,
});
