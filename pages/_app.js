import 'styles/globals.css';
import Layout from '@/layout/Layout';
import { DbProvider } from 'context/DbContext';
import { ThemeProvider } from 'context/themeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <DbProvider>
          <Component {...pageProps} />
        </DbProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
