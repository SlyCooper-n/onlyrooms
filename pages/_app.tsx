import { ThemeProvider, UserAuthProvider } from "@core/contexts";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserAuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserAuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;
