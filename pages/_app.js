import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import Head from "next/head";
import DarkModeProvider from "@/context/DarkModeContext";
import { useEffect } from "react";
import { getDashboardSettings } from "@/services/authService";
import { usePathname } from "next/navigation";
import CartShopProvider from "@/context/CartContext";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUserSettings() {
      try {
        const { data } = await getDashboardSettings();
        document.documentElement.style.setProperty("--font-primary", data.font);

        if (data.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {}
    }

    fetchUserSettings();
  }, [pathname]);

  return (
    <>
      <Head>
        <title>سامانه جامع محبوب‌ترین | دسترسی آسان به برترین‌ها </title>
        <meta
          name="description"
          content="«محبوب‌ترین» اولین سامانه معرفی و ارائه خدمات هوشمند برترین‌های هنر، ورزش، سلامت، اقتصاد، حقوق، فرهنگ، ادب، گردشگری، فناوری و ... می‌باشد."
        ></meta>
        <meta property="og:title" content="سامانه جامع محبوب‌ترین"></meta>
        <meta property="og:site_name" content="محبوب‌ترین"></meta>
        <meta property="og:locale" content="fa_IR"></meta>

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CartShopProvider>
          <DarkModeProvider>
            <Toaster />
            <div className="pb-20 lg:pb-0">
              <Component {...pageProps} />
            </div>
          </DarkModeProvider>
        </CartShopProvider>
      </QueryClientProvider>
    </>
  );
}
