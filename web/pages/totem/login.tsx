import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Page from '@/components/Page';
import Api from '@/lib/api';

export default function Login() {
  const [key, setKey] = useState('');
  const [apiError, setApiError] = useState('');

  async function submit() {
    const { error, result } = await Api.loginTotem(key);

    if (error) {
      setApiError(error.message);
    } else {
      Api.setTotemSession(result.jwt);
      window.location.href = '/totem';
    }
  }

  return (
    <Page center>
      <VStack spacing={2.5} maxWidth={450} width="100%" alignItems="start">
        <div>
          <Text fontSize="5xl">Login</Text>
        </div>

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
        <HStack justifyContent="end" width="100%">
          <Button colorScheme="purple" paddingX={45} onClick={() => submit()}>
            Enviar
          </Button>
        </HStack>
      </VStack>
    </Page>
  );
}
