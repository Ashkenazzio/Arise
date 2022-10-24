import styles from './FlowLists.module.css';
import FlowList from './FlowList';
import Balance from './Balance';

const FlowLists = (props) => {
  const { expenses, incomes } = props.queries;

  return (
    <div className={styles.view}>
      <FlowList
        list='Expenses'
        queries={expenses}
        categories={props.categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={props.onAddCategory}
      />
      <Balance queries={{ expenses, incomes }} />
      <FlowList
        list='Incomes'
        queries={incomes}
        categories={props.categories}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
        onAddCategory={props.onAddCategory}
      />
    </div>
  );
};

export default FlowLists;
