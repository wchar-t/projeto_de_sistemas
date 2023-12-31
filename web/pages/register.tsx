import { useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertIcon,
  Box,
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

export default function Register() {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  async function submit() {
    const { error, result } = await Api.register(
      name,
      lastName,
      user,
      email,
      password,
    );

    if (error) {
      setApiError(error.message);
    } else {
      Api.setToken(result.jwt);
    }
  }

  return (
    <Page center>
      <VStack spacing={30} maxWidth={450} width="100%" alignItems="start">
        <Box width="100%">
          <Text fontSize="5xl">Registro</Text>
          <Text color="#777">
            Já tem uma conta? <Link href="/login">Fazer login</Link>
          </Text>
        </Box>

        {apiError ? (
          <Alert status="error" width="100%" variant="left-accent">
            <AlertIcon />
            {apiError}
          </Alert>
        ) : null}

        <Box width="100%">
          <HStack>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Sobrenome</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
