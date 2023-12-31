import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MainProvider } from "@/lib/maincontext";  // Correct the import statement

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MainProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainProvider>
    </SessionProvider>
  );
}
