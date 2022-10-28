import Start from '@/start/Start';
import Head from 'next/head';
import { useEffect } from 'react';

const GetStarted = (props) => {
  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('Start');
    setQueryControl(false);
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
