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
import TotemRegisterModal from '@/components/TotemRegisterModal';
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

    const local = result.map((e: any) => ({
      ...e,
      coords: { lat: e.coords[0], lng: e.coords[1] },
    }));
    setTotems(local);
    setFilteredTotems(local);
  }

  async function onDelete(key: string) {
    await Api.deleteTotem(key);
    return updateTotems();
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
                placeholder="Chave"
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
                  <Th>Chave</Th>
                  <Th>Descrição</Th>
                  <Th>Criado em</Th>
                  <Th>Última Atividade</Th>
                  <Th>Apagar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredTotems.map((e, i) => (
                  <Tr key={e.key}>
                    <Td isNumeric>{i}</Td>
                    <Td>{e.key}</Td>
                    <Td>{e.description}</Td>
                    <Td>{new Date(e.createdAt).toLocaleString()}</Td>
                    <Td>
                      {e.lastActive
                        ? new Date(e.lastActive).toLocaleString()
                        : 'Nunca'}
                    </Td>
                    <Td>
                      <Text
                        color="tomato"
                        onClick={() => onDelete(e.key)}
                        _hover={{ cursor: 'pointer' }}
                      >
                        Deletar
                      </Text>
                    </Td>
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
