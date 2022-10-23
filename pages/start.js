import Start from '@/start/Start';
import Head from 'next/head';
import { useEffect } from 'react';

const GetStarted = (props) => {
  useEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Start');
    setFilter(false);
  }, []);

  return (
    <>
      <Head>
        <title>Arise | Start</title>
        <meta name='description' content='The Best Budget Tracking App!' />
        <link
          rel='icon'
          type='image/x-icon'
          href='public/favicon.ico'
        />
      </Head>
      <Start />
    </>
  );
};

export default GetStarted;
