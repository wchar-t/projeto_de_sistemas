import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  FormControl,
  FormLabel,
  Select,
  VStack,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

interface RoomSpotDrawerOptions {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomSpotDrawer({
  isOpen,
  onClose,
}: RoomSpotDrawerOptions) {
  const [rooms] = useState<
    {
      id: string;
      name: string;
      quantity: number;
    }[]
  >([
    { id: '', name: 'novo', quantity: 0 },
    { id: '-1', name: 'exemplo', quantity: 10 },
  ]);
  const [currentRoom, setCurrentRoom] = useState(rooms[0]);
  const [occupiedDate, setOccupiedDate] = useState(
    new Date().toLocaleDateString().split('/').reverse().join('-'),
  );
  const [occupiedRooms, setOccupiedRooms] = useState<
    {
      name: string;
      quantity: number;
      total: number;
    }[]
  >([
    { name: 'Exemplo', quantity: 10, total: 20 },
    { name: 'Exemplo 2', quantity: 10, total: 30 },
  ]);

  async function onRoomsSave() {
    // console.log(rooms, currentRoom);
  }

  useEffect(() => {
    // setOccupiedRooms([]);
  }, [occupiedDate]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Text mb={4} mt={4} fontWeight={600} opacity={0.8}>
            Vagas Totais
          </Text>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Formato</FormLabel>
              <Select
                isRequired
                textTransform="capitalize"
                onChange={(e) => {
                  const room = rooms.filter(
                    (c) => c.name === e.target.value,
                  )[0];
                  setCurrentRoom(room);
                }}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={currentRoom.name}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  setCurrentRoom({ ...currentRoom, name: value });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantidade</FormLabel>
              <Input
                type="tel"
                value={currentRoom.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10) || 0;
                  setCurrentRoom({ ...currentRoom, quantity: value });
                }}
              />
            </FormControl>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                colorScheme="purple"
                paddingX={45}
                onClick={() => onRoomsSave()}
              >
                Salvar
              </Button>
            </HStack>
          </VStack>

          <Text mb={4} mt={30} fontWeight={600} opacity={0.8}>
            Vagas Ocupadas
          </Text>
          <FormControl isRequired>
            <FormLabel>Data</FormLabel>
            <Input
              type="date"
              value={occupiedDate}
              onChange={(e) => setOccupiedDate(e.target.value)}
            />
          </FormControl>
          <TableContainer width="100%" borderRadius={6} mt={4}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Alocado</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {occupiedRooms.map((e) => (
                  <Tr key={e.name}>
                    <Td>{e.name}</Td>
                    <Td>{e.quantity}</Td>
                    <Td>{e.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
