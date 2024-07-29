import '@/styles/globals.css';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import UserDataProvider from '@/context/UserDataContext';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>سامانه جامع محبوب‌ترین | دسترسی آسان به برترین‌ها </title>
        <meta
          name='description'
          content='دسترسی آسان به برترین ها در هر مکان و زمان. فیلترها. اقتصاد. هنر. سلامت و زیبایی. ورزش. وکالت و حقوق. تفریح و گردش. محبوب مال. پیشنهاد ویژه.
'></meta>
        <meta
          property='og:title'
          content='سامانه جامع محبوب‌ترین'></meta>
        <meta
          property='og:site_name'
          content='محبوب‌ترین'></meta>
        <meta
          property='og:locale'
          content='fa_IR'></meta>

        <link
          rel='shortcut icon'
          href='/favicon.png'
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <Toaster />
          <Component {...pageProps} />
        </UserDataProvider>
      </QueryClientProvider>
    </>
  );
}
