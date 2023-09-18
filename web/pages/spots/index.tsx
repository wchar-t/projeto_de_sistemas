import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import Page from '@/components/Page';
import TotemRegisterModal from '@/components/TotemRegister';
import Totem from '@/interfaces/client/Totem';
import Api from '@/lib/api';

export default function Totems() {
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totems, setTotems] = useState<Totem[]>([]);
  const [filteredTotems, setFilteredTotems] = useState<Totem[]>([]);

  async function updateTotems() {
    const { error, result } = await Api.getTotems();

    if (error) return;

    const _totems = result.totems.map((e: any) => ({ ...e, coords: { lat: e.coords[0], lng: e.coords[1] } }));
    setTotems(_totems);
    setFilteredTotems(_totems);
  }

  useEffect(() => {
    (async () => {
      await updateTotems();
    })();
  }, []);

  useEffect(() => {
    setFilteredTotems(
      totems.filter((e) => e.key.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search]);

  return (
    <Page center>
      <TotemRegisterModal isOpen={isOpen} onClose={onClose} />
      <Box width="100%" maxWidth={1280}>
        <VStack>
          <HStack width="100%">
            <FormControl>
              <Input
                width="100%"
                type="text"
                placeholder="Título"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="green" paddingX={6} onClick={() => onOpen()}>
              Novo
            </Button>
          </HStack>
          <TableContainer
            width="100%"
            borderRadius={6}
            overflowY="auto"
            maxHeight="540px"
          >
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th isNumeric>#</Th>
                  <Th>Título</Th>
                  <Th>Latitude</Th>
                  <Th>Longitude</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTotems.map((e, i) => (
                  <Tr key={e.key}>
                    <Td isNumeric>{i}</Td>
                    <Td>titulo</Td>
                    <Td>{e.coords.lat}</Td>
                    <Td>{e.coords.lng}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Box>
    </Page>
  );
}
