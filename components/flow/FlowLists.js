import styles from './FlowLists.module.css';
import FlowList from './FlowList';
import Balance from './Balance';

import { useDb } from 'context/DbContext';
import { useLayoutEffect, useState } from 'react';
import { useAuthUser } from 'context/AuthContext';

const FlowLists = () => {
  const [authUser] = useAuthUser();
  const [dbExpenses, dbIncomes] = useDb();

  const [expenses, setExpenses] = useState(dbExpenses);
  const [incomes, setIncomes] = useState(dbIncomes);

  useLayoutEffect(() => {
    if (!authUser) {
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

  const onUpdateItem = (itemId, list, queryData) => {
    if (list === 'Expenses') {
      expenses.map((item) => {
        if (item.id === itemId) {
          return { ...item, queryData };
        }
        return item;
      });
      setExpenses([...expenses]);
      return;
    }

    incomes.map((item) => {
      if (item.id === itemId) {
        return { ...item, queryData };
      }
      return item;
    });
    setIncomes([...incomes]);
  };

  const onDeleteItem = (itemId, list) => {
    if (list === 'Expenses') {
      const item = expenses.find((i) => i.id === itemId);
      const itemIndex = expenses.indexOf(item);

      if (itemIndex > -1) {
        expenses.splice(itemIndex, 1);
        setExpenses([...expenses]);
      }
    }
    const item = incomes.find((i) => i.id === itemId);
    const itemIndex = incomes.indexOf(item);

    if (itemIndex > -1) {
      incomes.splice(itemIndex, 1);
      setIncomes([...incomes]);
    }
  };

  return (
    <div className={styles.view}>
      <FlowList
        list='Expenses'
        queries={expenses}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      />
      <Balance queries={[expenses, incomes]} />
      <FlowList
        list='Incomes'
        queries={incomes}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};

export default FlowLists;
