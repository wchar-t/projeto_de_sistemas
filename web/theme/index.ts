import { extendTheme } from '@chakra-ui/react';
import Input from './input';
import Table from './table';
import Modal from './modal';

export default extendTheme({
  styles: {
    global: {
      body: {
        color: '#fff',
        bg: '#0e0e10',
      },
      a: {
        color: '#9369f0',
        textDecoration: 'none',
      },
    },
  },
  components: {
    Input,
    Table,
    Modal,
  },
});