import { useDb } from 'context/DbContext';
import { useAnonymousUser } from 'context/AnonymousContext';
import { useLayoutEffect, useState } from 'react';
import Balance from './Balance';
import FlowBlock from './FlowBlock';
import styles from './FlowLists.module.css';

const FlowLists = () => {
  const [anonyUser] = useAnonymousUser();
  const [dbExpenses, dbIncomes] = useDb();

  const [expenses, setExpenses] = useState(dbExpenses);
  const [incomes, setIncomes] = useState(dbIncomes);

  useLayoutEffect(() => {
    if (anonyUser) {
      const localExpensesJSON = localStorage.getItem('expenses');
      const localIncomesJSON = localStorage.getItem('incomes');

      if (localExpensesJSON) {
        setExpenses(JSON.parse(localExpensesJSON));
      } else {
        setExpenses([]);
      }
      if (localIncomesJSON) {
        setIncomes(JSON.parse(localIncomesJSON));
      } else {
        setIncomes([]);
      }
    }
  }, []);

  const onUpdateItem = (itemId, queryData) => {
    setExpenses(
      expenses.map((item) => {
        if (item.id === itemId) {
          return { ...item, queryData };
        }
        return item;
      })
    );
  };

  const onDeleteItem = (itemId) => {
    const item = expenses.find((i) => i.id === itemId);
    const itemIndex = expenses.indexOf(item);
    if (itemIndex > -1) {
      setExpenses(expenses.splice(itemIndex, 1));
    }
  };

  return (
    <div className={styles.view}>
      <FlowBlock
        queries={expenses}
        icon={String.fromCharCode(0xf068)}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      />
      <Balance queries={[expenses, incomes]} />
      <FlowBlock
        queries={incomes}
        icon={String.fromCharCode(0x2b)}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};

export default FlowLists;
