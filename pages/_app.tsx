import { AuthProvider } from "@core/contexts";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;
