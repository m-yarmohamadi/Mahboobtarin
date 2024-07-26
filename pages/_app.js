import "@/styles/globals.css";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import Head from "next/head";
import UserDataProvider from "@/context/UserDataContext";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>سامانه جامع محبوب‌ترین | دسترسی آسان به برترین‌ها </title>
        <link rel="shortcut icon" href="/favicon.png" />
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
