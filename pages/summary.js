import SummaryPage from '@/summary/SummaryPage';
import { useLayout } from 'context/LayoutContext';

const Summary = (props) => {
  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Summary');
  setSort(true);

  return <SummaryPage />;
};

export default Summary;
