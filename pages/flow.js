import FlowLists from '@/flow/FlowLists';
import { useLayout } from 'context/LayoutContext';

const Flow = () => {
  const onUpdateItem = (props) => {
    console.log(props);
  };

  const onDeleteItem = (props) => {
    console.log(props);
  };

  const [title, setTitle, sort, setSort] = useLayout();
  setTitle('Flow');
  setSort(true);

  return <FlowLists />;
};

export default Flow;
