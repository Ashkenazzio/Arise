import { useDb } from 'context/DbContext';
import { useSession } from 'context/SessionContext';
import { useEffect, useState } from 'react';
import Balance from './Balance';
import FlowBlock from './FlowBlock';
import styles from './FlowLists.module.css';

const FlowLists = () => {
  const [localSession] = useSession();
  const [dbExpenses, dbIncomes] = useDb();

  let expenses = [];
  let incomes = [];

  if (localSession) {
    useEffect(() => {
      if (localSession) {
        const localExpensesJSON = localStorage.getItem('expenses');
        const localIncomesJSON = localStorage.getItem('incomes');
        console.log(localExpensesJSON);

        if (localExpensesJSON) {
          expenses = JSON.parse(localExpensesJSON);
          console.log(expenses);
        }
        if (localIncomesJSON) {
          incomes = JSON.parse(localIncomesJSON);
        }
      }
    }, []);
  } else {
    expenses = [...dbExpenses];
    incomes = [...dbIncomes];
  }

  console.log(expenses);

  return (
    <div className={styles.view}>
      <FlowBlock queries={expenses} icon={String.fromCharCode(0xf068)} />
      <Balance queries={[expenses, incomes]} />
      <FlowBlock queries={incomes} icon={String.fromCharCode(0x2b)} />
    </div>
  );
};

export default FlowLists;
