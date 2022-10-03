import FlowLists from '@/flow/FlowLists';
import { useLayoutEffect } from 'react';

const Flow = (props) => {
  const onUpdateItem = (props) => {
    console.log(props);
  };

  const onDeleteItem = (props) => {
    console.log(props);
  };

  useLayoutEffect(() => {
    const [setTitle, setFilter] = props.layout;
    setTitle('Flow');
    setFilter(true);
  }, []);

  return <FlowLists />;
};

export default Flow;
