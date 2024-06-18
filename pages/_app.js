import "@/styles/globals.css";

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';



export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
