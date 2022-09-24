import Start from '@/start/Start';
import { useLayout } from 'context/LayoutContext';

const GetStarted = () => {
  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Start');
  setSort(false);

  return <Start />;
};

export default GetStarted;
