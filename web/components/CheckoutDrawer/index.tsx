import { useEffect, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import PIXQRCode from '../PIXQRCode';
import Api from '@/lib/api';
import Room from '@/interfaces/client/Room';

interface CheckoutDrawerOptions {
  spotId: string;
  timestamp: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutDrawer({
  spotId,
  timestamp,
  isOpen,
  onClose,
}: CheckoutDrawerOptions) {
  // isn't checking rooms' limits, mr. hacker
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [seed, setSeed] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>();
  const [order, setOrder] = useState<{ qt: number; room: Room }[]>([]);

  async function refreshRooms() {
    let { result: roomsResult } = await Api.getRooms(spotId as string);
    roomsResult = (roomsResult ?? []).map((e) => ({
      ...e,
      price: (parseFloat(e.price.toString()) / 100).toFixed(2),
      total: 1,
    }));

    setRooms(roomsResult ?? []);
    setCurrentRoom(roomsResult[0]);
  }

  function onSuccess() {
    // setTimeout(() => onClose(), 5000);
  }

  useEffect(() => {
    refreshRooms();
    // reseting states
    setName('');
    setCpf('');
    setEmail('');
    setSeed('');
    setOrder([]);
    setRooms([]);
    setDate(new Date().toISOString().split('T')[0]);
    setCurrentRoom(undefined);
  }, [timestamp]);

  useEffect(() => {
    const interval = setTimeout(
      () => setSeed(`${new Date().getTime()}|${name}|${cpf}|${email}`),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [name, cpf, email]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xs">
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody mt={15}>
          <Text mb={4} mt={4} fontWeight={600} opacity={0.8}>
            Dados
          </Text>

          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>CPF</FormLabel>
              <Input
                type="text"
                value={cpf}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const vCpf = value.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    '$1.$2.$3-$4',
                  );
                  setCpf(vCpf.slice(0, 14));
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </VStack>

          <Text mb={4} mt={30} fontWeight={600} opacity={0.8}>
            Reserva
          </Text>

          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Data de Reserva</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tipo</FormLabel>
              <Select
                isRequired
                textTransform="capitalize"
                onChange={(e) => {
                  const r = rooms.filter((c) => c.name === e.target.value)[0];
                  setCurrentRoom({
                    id: r.id,
                    name: r.name,
                    price: r.price,
                    total: 1,
                  });
                }}
                value={currentRoom?.name}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Preço</FormLabel>
              <InputGroup>
                <InputLeftAddon>R$</InputLeftAddon>
                <Input
                  disabled
                  value={(() => {
                    const price = parseFloat(
                      (currentRoom?.price || 0).toString(),
                    );
                    const total = parseInt(
                      (currentRoom?.total || 1).toString(),
                      10,
                    );
                    return (price * total).toFixed(2);
                  })()}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Quantidade</FormLabel>
              <Input
                type="text"
                value={currentRoom?.total}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCurrentRoom({
                    ...currentRoom!,
                    total: parseInt(value, 10) || value,
                  });
                }}
              />
            </FormControl>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                colorScheme="purple"
                w="100%"
                onClick={() => {
                  setOrder([
                    ...order,
                    {
                      qt:
                        parseInt((currentRoom?.total || 1).toString(), 10) || 1,
                      room: currentRoom!,
                    },
                  ]);
                }}
              >
                Adicionar
              </Button>
            </HStack>
          </VStack>

          <Text mb={4} mt={30} fontWeight={600} opacity={0.8}>
            Resumo de Pagamento
          </Text>

          <VStack spacing={0}>
            {order.map((e) => (
              <HStack key={e.room.id} w="100%" justifyContent="space-between">
                <Text>
                  {e.room.name} x {e.qt}
                </Text>
                <Text>
                  R$ {(parseFloat(e.room.price.toString()) * e.qt).toFixed(2)}
                </Text>
              </HStack>
            ))}
            <HStack w="100%" justifyContent="space-between" mt={4}>
              <Text fontSize={22} fontWeight={600}>
                Total
              </Text>
              <Text fontSize={22} fontWeight={600}>
                R${' '}
                {order
                  .map((e) => parseFloat(e.room.price.toString()) * e.qt)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)}
              </Text>
            </HStack>
          </VStack>

          <Text mb={4} mt={30} fontWeight={600} opacity={0.8}>
            Pagamento
          </Text>

          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Método</FormLabel>
              <Select isRequired textTransform="capitalize">
                <option value="pix">PIX</option>
              </Select>
            </FormControl>
            <PIXQRCode onSuccess={() => onSuccess()} seed={seed} />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
