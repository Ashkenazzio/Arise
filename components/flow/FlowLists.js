import { getDaysAgoData } from 'lib/utilities/dateFilters';
import { motion } from 'framer-motion';

import styles from './FlowLists.module.css';
import FlowList from './flow-list/FlowList';
import Balance from './Balance';
import { flowPageVars } from 'lib/framer-variants';

const FlowLists = (props) => {
  const { expenses, incomes } = props.queries;

  const filterData = (filter, list) => {
    if (filter.id <= 5) {
      return getDaysAgoData(list, filter.value);
    }

    // if (filter >= 5) {
    //   return;
    // }
  };

  const [expenseAgoData] = filterData(props.filter, expenses);
  const [incomeAgoData] = filterData(props.filter, incomes);
  return (
    <motion.div variants={flowPageVars} className={styles.view}>
      <FlowList
        list='Expenses'
        queries={props.filter.id ? expenseAgoData : expenses}
        categories={props.categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={props.onAddCategory}
      />
      <Balance
        queries={
          props.filter.id
            ? [expenseAgoData, incomeAgoData]
            : [expenses, incomes]
        }
      />
      <FlowList
        list='Incomes'
        queries={props.filter.id ? incomeAgoData : incomes}
        categories={props.categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={props.onAddCategory}
      />
    </motion.div>
  );
};

export default FlowLists;
