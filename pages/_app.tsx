import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import Providers from "../contexts/Providers";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </Providers>
  );
}
