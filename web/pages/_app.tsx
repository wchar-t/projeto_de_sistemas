import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import theme from '../theme';
import Api from '@/lib/api';

const inter = Inter({ subsets: ['latin'] });

/* eslint-disable react/jsx-props-no-spreading */

export default function App({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { error, result } = await Api.getMe();
      Api.setSession(!error ? result.session : null);
      Api.setToken(!error ? result.jwt : '');
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <div> </div>;
  }

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
