import axios from "axios";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps as NextAppProps } from "next/app";
import Script from "next/script";
import { SWRConfig } from "swr";
import { AdminRoute } from "../components/AdminRoute";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PreferencesProvider } from "../context/PreferencesProvider";
import "../styles/globals.css";

interface IsProtectedProp {
  isProtected?: boolean;
}

interface IsAdminProp {
  isAdmin?: boolean;
}

// Custom type to override Component type
type AppProps<P = any> = {
  Component: NextComponentType<NextPageContext, any, {}> &
    IsProtectedProp &
    IsAdminProp &
    any;
} & Omit<NextAppProps<P>, "Component">;

const MyApp: NextPage<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    {/* Google Analytics Geotag */}
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
    />

    <Script id="google-analytics" strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
        });
            `}
    </Script>
    {/* End of Google analytics Geotag */}
    <SWRConfig
      value={{
        fetcher: (url) => axios(url).then((res) => res.data),
      }}
    >
      <PreferencesProvider>
        {Component.isAdmin ? (
          <AdminRoute>
            <Component {...pageProps} />
          </AdminRoute>
        ) : Component.isProtected ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </PreferencesProvider>
    </SWRConfig>
  </SessionProvider>
);

export default MyApp;
