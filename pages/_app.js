import 'styles/globals.css';
import Layout from '@/layout/Layout';
import AlterLayout from '@/layout/AlterLayout';
import { ThemeProvider } from 'context/ThemeContext';
import { CurrencyProvider } from 'context/CurrencyContext';
import { SessionProvider } from 'next-auth/react';
import { AnonymousProvider } from 'context/AnonymousContext';

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <AlterLayout>
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
              <Component {...pageProps} />
            </Layout>
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
    </AnonymousProvider>
  );
}

export default MyApp;
