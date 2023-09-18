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
} from '@chakra-ui/react';
import Page from '@/components/Page';
import SpotRegisterModal from '@/components/SpotRegisterModal';
import Api from '@/lib/api';
import Location from '@/interfaces/client/Location';

export default function Totems() {
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  async function updateLocations() {
    const { error, result } = await Api.getLocations();

    if (error) return;

    setLocations(result);
    setFilteredLocations(result);
    console.log(result);
  }

  useEffect(() => {
    (async () => {
      await updateLocations();
    })();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFilteredLocations(
      locations.filter((e) => e.title.toLowerCase().includes(s)),
    );
  }, [search]);

  return (
    <Page center>
      <SpotRegisterModal isOpen={isOpen} onClose={onClose} />
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
                {filteredLocations.map((e, i) => (
                  <Tr key={e.id}>
                    <Td isNumeric>{i}</Td>
                    <Td>{e.title}</Td>
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
