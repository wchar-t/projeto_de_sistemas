import { useState } from 'react';
import Image from 'next/image';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Api from '@/lib/api';
import MapMarkable from '../MapMarkable';

interface TotemRegisterModalOptions {
  isOpen: boolean;
  onClose: () => void;
}

export default function TotemRegisterModal({
  isOpen,
  onClose,
}: TotemRegisterModalOptions) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [price, setPrice] = useState('0.00');
  const [priceFormat, setPriceFormat] = useState('entrada');
  const [icon, setIcon] = useState('location-pin');
  const [apiError, setApiError] = useState('');
  const [latLng, setLatLng] = useState({ lat: 0.0, lng: 0.0 });

  async function onSubmit() {
    const { error } = await Api.registerLocation(
      title,
      subtitle,
      description,
      images.filter((e) => e !== ''),
      parseInt((parseFloat(price) * 100).toString(10), 10),
      priceFormat,
      icon,
      latLng.lat,
      latLng.lng,
    );

    if (error) {
      setApiError(error.message);
    } else {
      onClose();
      window.location.reload();
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registro de Ponto Turístico</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2.5} paddingBottom={15}>
            {apiError ? (
              <Alert status="error" width="100%" variant="left-accent">
                <AlertIcon />
                {apiError}
              </Alert>
            ) : null}
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Subtítulo</FormLabel>
              <Input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            {images.map((e, i) => (
              <FormControl isRequired key={e}>
                <FormLabel>Imagem</FormLabel>
                <Input
                  type="text"
                  value={images[i]}
                  placeholder="Link da imagem ou vazio para não incluir"
                  onChange={(event) => {
                    const { value } = event.target;
                    const cpy = [...images].filter((val) => val !== '');
                    cpy[i] = value;
                    if (cpy.length > 0 && cpy[cpy.length - 1] !== '') {
                      cpy.push('');
                    }
                    setImages(cpy);
                  }}
                />
              </FormControl>
            ))}

            <HStack width="100%">
              <FormControl isRequired>
                <FormLabel>Preço</FormLabel>
                <InputGroup>
                  <InputLeftAddon>R$</InputLeftAddon>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value.replace(',', '.'))}
                    onBlur={() => {
                      const p = parseFloat(price).toFixed(2);
                      setPrice(Number.isNaN(p) || p === 'NaN' ? '0.00' : p);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Formato</FormLabel>
                <Select
                  isRequired
                  defaultValue="entrada"
                  value={priceFormat}
                  onChange={(e) => setPriceFormat(e.target.value)}
                >
                  <option value="entrada">Entrada</option>
                  <option value="diaria">Diária</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Ícone</FormLabel>
              <RadioGroup
                defaultValue="location-pin"
                value={icon}
                onChange={(e) => setIcon(e)}
              >
                <HStack justifyContent="space-between">
                  <Radio value="location-pin">
                    <Image
                      alt="icon"
                      src="/static/img/maps/location-pin.png"
                      width={22}
                      height={32}
                    />
                  </Radio>
                  <Radio value="heat">
                    <Image
                      alt="icon"
                      src="/static/img/maps/heat.png"
                      width={32}
                      height={32}
                    />
                  </Radio>
                  <Radio value="canyon">
                    <Image
                      alt="icon"
                      src="/static/img/maps/canyon.png"
                      width={32}
                      height={32}
                    />
                  </Radio>
                  <Radio value="mountains">
                    <Image
                      alt="icon"
                      src="/static/img/maps/mountains.png"
                      width={32}
                      height={32}
                    />
                  </Radio>
                  <Radio value="water">
                    <Image
                      alt="icon"
                      src="/static/img/maps/water.png"
                      width={32}
                      height={32}
                    />
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Localização (clique no ponto)</FormLabel>
            </FormControl>
            <MapMarkable
              height={380}
              onChange={(lat: number, lng: number) => {
                setLatLng({ lat, lng });
              }}
            />
            <HStack width="100%">
              <FormControl isRequired>
                <FormLabel>Latitude</FormLabel>
                <Input type="text" value={latLng.lat} isDisabled />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Longitude</FormLabel>
                <Input type="text" value={latLng.lng} isDisabled />
              </FormControl>
            </HStack>
          </VStack>
          <HStack spacing={2.5} justifyContent="space-between">
            <button onClick={onClose} type="button">
              Cancelar
            </button>
            <Button
              colorScheme="purple"
              paddingX={45}
              onClick={() => onSubmit()}
            >
              Enviar
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
