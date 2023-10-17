import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
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
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import Room from '@/interfaces/client/Room';
import Api from '@/lib/api';
import RoomOccupied from '@/interfaces/client/RoomOccupied';

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
  const [currentRoom, setCurrentRoom] = useState<Room>({
    id: '',
    name: 'novo',
    price: 0,
    total: 0,
  });
  const [occupiedDate, setOccupiedDate] = useState('');
  const [occupiedRooms, setOccupiedRooms] = useState<RoomOccupied[]>([]);

  async function refreshOccupiedRooms() {
    const start = Math.floor(new Date(occupiedDate).getTime() / 1000);
    const end = start + 24 * 60 * 60;
    const { result: occupiedResult } = await Api.getOccupiedRooms(
      start,
      end,
      spotId as string,
    );

    setOccupiedRooms(occupiedResult ?? []);
  }

  async function refreshRooms() {
    let { result: roomsResult } = await Api.getRooms(spotId as string);
    roomsResult = (roomsResult ?? []).map((e) => ({
      ...e,
      price: (parseFloat(e.price.toString()) / 100).toFixed(2),
    }));
    roomsResult.unshift({ id: '', name: '', price: 0, total: 0 });

    setRooms(roomsResult ?? []);
    setCurrentRoom(roomsResult[0]);
  }

  async function onRoomsSave() {
    await Api.saveRoom(
      spotId as string,
      currentRoom.name,
      parseInt(
        (parseFloat((currentRoom?.price || 0).toString()) * 100).toString(10),
        10,
      ),
      parseInt(currentRoom.total.toString(), 10),
      currentRoom.id,
    );
    await refreshRooms();
  }

  useEffect(() => {
    (async () => {
      await refreshOccupiedRooms();
    })();
  }, [occupiedDate]);

  useEffect(() => {
    setOccupiedRooms([]);
    setIsLoading(true);

    (async () => {
      await refreshRooms();
      await refreshOccupiedRooms();
      setIsLoading(false);
    })();

    setOccupiedDate(new Date().toISOString().split('T')[0]);
  }, [spotId]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody mt={65}>
          <Text mb={4} mt={4} fontWeight={600} opacity={0.8}>
            Vagas Totais
          </Text>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Vaga</FormLabel>
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
                  value={currentRoom?.name}
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name === '' ? 'novo' : room.name}
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
                    setCurrentRoom({
                      ...currentRoom,
                      name: value,
                    });
                  }}
                />
              </Skeleton>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preço</FormLabel>
              <Skeleton isLoaded={!isLoading}>
                <InputGroup>
                  <InputLeftAddon>R$</InputLeftAddon>
                  <Input
                    value={currentRoom?.price}
                    onChange={(e) => {
                      setCurrentRoom({
                        ...currentRoom,
                        price: e.target.value.replace(',', '.'),
                      });
                    }}
                    onBlur={() => {
                      const p = parseFloat(
                        (currentRoom?.price || 0).toString(),
                      ).toFixed(2);
                      setCurrentRoom({
                        ...currentRoom,
                        price: Number.isNaN(p) || p === 'NaN' ? '0.00' : p,
                      });
                    }}
                  />
                </InputGroup>
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
                      <Td>{e.occupied}</Td>
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
