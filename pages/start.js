import Start from '@/start/Start';
import { useLayoutEffect } from 'react';

const GetStarted = (props) => {
  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Start');
    setFilter(false);
  }, []);

  return <Start />;
};

export default GetStarted;
