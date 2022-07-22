import { AuthProvider, ThemeProvider } from "@core/contexts";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;
