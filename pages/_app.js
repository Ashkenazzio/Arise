import 'styles/globals.css';
import Layout from '@/layout/Layout';
import AlterLayout from '@/layout/AlterLayout';
import { DbProvider } from 'context/DbContext';
import { ThemeProvider } from 'context/ThemeContext';
import { CurrencyProvider } from 'context/CurrencyContext';
import { AnonymousProvider } from 'context/AnonymousContext';

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <AnonymousProvider>
        <ThemeProvider>
          <DbProvider>
            <CurrencyProvider>
              <AlterLayout>
                <Component {...pageProps} />
              </AlterLayout>
            </CurrencyProvider>
          </DbProvider>
        </ThemeProvider>
      </AnonymousProvider>
    );
  }

  return (
    <AnonymousProvider>
      <ThemeProvider>
        <DbProvider>
          <CurrencyProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CurrencyProvider>
        </DbProvider>
      </ThemeProvider>
    </AnonymousProvider>
  );
}

export default MyApp;
