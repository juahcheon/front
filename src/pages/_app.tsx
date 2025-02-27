import GNB from "@/components/commons/GNB";
import "@/styles/base/index.scss";
import "@/styles/main.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} /> */}

      {/* 카카오톡 로그인 */}
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          {pageProps.isLoading ? (
            <div>is Loading...</div>
          ) : (
          <>
            <Component {...pageProps} />
            <GNB />
          </>
          )}
        </SessionProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
