import '@/styles/globals.css';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
    // <QueryClientProvider client={queryClient}>
        <Toaster />
        return <Component {...pageProps} />;
    // </QueryClientProvider>;
}
