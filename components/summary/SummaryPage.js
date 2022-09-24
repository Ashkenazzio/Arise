import styles from './SummaryPage.module.css';
import { useEffect } from 'react';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useDb } from 'context/DbContext';
import { useSession } from 'context/SessionContext';

const DUMMY_EXP = [
  {
    id: 'Food',
    title: 'Food',
    sum: 57,
  },
  {
    id: 'Utilities',
    title: 'Utilities',
    sum: 234.03,
  },
  {
    id: 'Fun',
    title: 'Fun',
    sum: 248,
  },
  {
    id: 'Work',
    title: 'Work',
    sum: 324,
  },
  {
    id: 'Transport',
    title: 'Transport',
    sum: 32,
  },
  {
    id: 'Pharma',
    title: 'Pharma',
    sum: 104,
  },
];

const SummaryPage = (props) => {
  const [localSession] = useSession();
  const [dbExpenses] = useDb();

  let expenses = [];

  if (localSession) {
    useEffect(() => {
      if (localSession) {
        const localExpensesJSON = localStorage.getItem('expenses');

        if (localExpensesJSON) {
          expenses = [JSON.parse(localExpensesJSON)];
        }
      }
    }, []);
  } else {
    expenses = [...dbExpenses];
  }

  const totalExpensesByCategory = Object.entries(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = curr.sum;
      } else {
        acc[curr.category] = +acc[curr.category] + curr.sum;
      }
      return acc;
    }, {})
  ).map(([k, v]) => ({ id: k, title: k, sum: v }));

  return (
    <div className={styles.view}>
      {expenses.length === 0 && (
        <div className={styles.placeholder}>
          <p className={styles.empty}>No entries to show yet!</p>
        </div>
      )}
      <ExpenseRail
        expensesByCategory={
          expenses.length !== 0 ? totalExpensesByCategory : DUMMY_EXP
        }
      />
      <Graph
        expensesByCategory={
          expenses.length !== 0 ? totalExpensesByCategory : DUMMY_EXP
        }
      />
      <Info
        expensesByCategory={
          expenses.length !== 0 ? totalExpensesByCategory : DUMMY_EXP
        }
      />
    </div>
  );
};

export default SummaryPage;
