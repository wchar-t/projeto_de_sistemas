import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import Api from '@/lib/api';

interface TotemRegisterModalOptions {
  isOpen: boolean;
  onClose: () => void;
}

export default function TotemRegisterModal({
  isOpen,
  onClose,
}: TotemRegisterModalOptions) {
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [apiError, setApiError] = useState('');

  async function onSubmit() {
    const { error } = await Api.registerTotem(key, description);

    if (error) {
      setApiError(error.message);
    } else {
      onClose();
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registro de Totem</ModalHeader>
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
              <FormLabel>Chave</FormLabel>
              <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
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
