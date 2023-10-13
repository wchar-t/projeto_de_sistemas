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
  Skeleton,
} from '@chakra-ui/react';
import Room from '@/interfaces/client/Room';
import Api from '@/lib/api';

interface RoomSpotDrawerOptions {
  spotId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomSpotDrawer({
  spotId,
  isOpen,
  onClose,
}: RoomSpotDrawerOptions) {
  if (!spotId) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>(null);
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
    console.log(occupiedDate);
  }, [occupiedDate]);

  useEffect(() => {
    setOccupiedRooms([]);
    setIsLoading(true);

    (async () => {
      const { result: roomsResult } = (await Api.getRooms(spotId)) ?? [];
      const { result: occupiedResult } = (await Api.getOccupiedRooms()) ?? [];
    })();

    setTimeout(() => setIsLoading(false), 5000);
  }, [spotId]);

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
              <Skeleton isLoaded={!isLoading}>
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
              </Skeleton>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Skeleton isLoaded={!isLoading}>
                <Input
                  type="text"
                  value={currentRoom?.name}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    setCurrentRoom({ ...currentRoom, name: value });
                  }}
                />
              </Skeleton>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantidade</FormLabel>
              <Skeleton isLoaded={!isLoading}>
                <Input
                  type="tel"
                  value={currentRoom?.total}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10) || 0;
                    setCurrentRoom({ ...currentRoom, total: value });
                  }}
                />
              </Skeleton>
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
            <Skeleton isLoaded={!isLoading}>
              <Input
                type="date"
                value={occupiedDate}
                onChange={(e) => setOccupiedDate(e.target.value)}
              />
            </Skeleton>
          </FormControl>
          <Skeleton isLoaded={!isLoading}>
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
          </Skeleton>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
