import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link href='https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap' rel='stylesheet' />
        </Head>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Provider>
    </ChakraProvider>
  );
}
export default MyApp;
