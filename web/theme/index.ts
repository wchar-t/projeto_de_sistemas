import { extendTheme } from '@chakra-ui/react';
import Input from './input';
import Table from './table';
import Modal from './modal';
import Textarea from './textarea';
import Select from './select';
import Alert from './alert';
import Menu from './menu';
import Skeleton from './skeleton';
import Drawer from './drawer';

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
      option: {
        bg: '#171717 !important',
      },
    },
  },
  components: {
    Input,
    Table,
    Modal,
    Textarea,
    Select,
    Alert,
    Menu,
    Skeleton,
    Drawer,
  },
});
