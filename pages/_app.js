import { ThemeProvider } from 'context/ThemeContext';
import { CurrencyProvider } from 'context/CurrencyContext';
import { SessionProvider } from 'next-auth/react';
import { AnonymousProvider } from 'context/AnonymousContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/google-analytics';

import 'styles/globals.css';
import Head from 'next/head';
import Layout from '@/layout/Layout';
import AlterLayout from '@/layout/AlterLayout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <AlterLayout>
            <Head>
              <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/apple-touch-icon.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicon-32x32.png'
              />
              <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicon-16x16.png'
              />
              <link rel='manifest' href='/site.webmanifest' />
              <link
                rel='mask-icon'
                href='/safari-pinned-tab.svg'
                color='#5bbad5'
              />
              <meta name='msapplication-TileColor' content='#da532c' />
              <meta name='theme-color' content='#ffffff' />
            </Head>
            <Component {...pageProps} />
          </AlterLayout>
        </ThemeProvider>
      </SessionProvider>
    );
  }

  return (
    <AnonymousProvider>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <CurrencyProvider>
            <Layout>
              <Head>
                <link
                  rel='apple-touch-icon'
                  sizes='180x180'
                  href='/apple-touch-icon.png'
                />
                <link
                  rel='icon'
                  type='image/png'
                  sizes='32x32'
                  href='/favicon-32x32.png'
                />
                <link
                  rel='icon'
                  type='image/png'
                  sizes='16x16'
                  href='/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
                <link
                  rel='mask-icon'
                  href='/safari-pinned-tab.svg'
                  color='#5bbad5'
                />
                <meta name='msapplication-TileColor' content='#da532c' />
                <meta name='theme-color' content='#ffffff' />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
    </AnonymousProvider>
  );
}

export default MyApp;
