import { useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Page from '@/components/Page';
import Api from '@/lib/api';

export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  async function submit() {
    const { error, result } = await Api.login(user, password);

    if (error) {
      setApiError(error.message);
    } else {
      Api.setToken(result.jwt);
      window.location.href = '/';
    }
  }

  return (
    <Page center>
      <VStack spacing={30} maxWidth={450} width="100%" alignItems="start">
        <Box width="100%">
          <Text fontSize="5xl">Login</Text>
          <Text color="#777">
            Não tem uma conta? <Link href="/register">Fazer registro</Link>
          </Text>
          <Text color="#777">
            Ou que tal se <Link href="/totem/login">Logar como totem</Link>
          </Text>
        </Box>

        {apiError ? (
          <Alert status="error" width="100%" variant="left-accent">
            <AlertIcon />
            {apiError}
          </Alert>
        ) : null}

        <Box width="100%">
          <FormControl isRequired>
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button colorScheme="purple" paddingX={45} onClick={() => submit()}>
          Enviar
        </Button>
      </VStack>
    </Page>
  );
}
