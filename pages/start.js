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
      </Head>
      <Start />
    </>
  );
};

export default GetStarted;
