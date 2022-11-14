import Start from '@/start/Start';
import Head from 'next/head';
import { useEffect } from 'react';

const GetStarted = (props) => {
  useEffect(() => {
    const [setTitle, setFilter, setQueryControl] = props.layout;

    setTitle('');
    setQueryControl(false);
    setFilter(false);
  }, [props.layout]);

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
