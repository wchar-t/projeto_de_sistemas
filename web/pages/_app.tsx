import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import theme from '../theme';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  // TODO: api loading thing
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
