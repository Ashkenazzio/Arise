import 'styles/globals.css';
import Layout from '@/layout/Layout';
import { DbProvider } from 'context/DbContext';
import { ThemeProvider } from 'context/themeContext';
import { CurrencyProvider } from 'context/CurrencyContext';
import { LayoutProvider } from 'context/LayoutContext';
import AlterLayout from '@/layout/AlterLayout';
import { SessionProvider } from 'context/SessionContext';

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider>
        <ThemeProvider>
          <LayoutProvider>
            <AlterLayout>
              <DbProvider>
                <CurrencyProvider>
                  <Component {...pageProps} />
                </CurrencyProvider>
              </DbProvider>
            </AlterLayout>
          </LayoutProvider>
        </ThemeProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider>
        <LayoutProvider>
          <Layout>
            <DbProvider>
              <CurrencyProvider>
                <Component {...pageProps} />
              </CurrencyProvider>
            </DbProvider>
          </Layout>
        </LayoutProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
