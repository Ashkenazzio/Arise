import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useEffect, useState } from 'react';

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
  const expenses = props.expenses;
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (expenses.length === 0) {
      setEmpty(true);
    }
  }, [expenses]);

  const totalExpensesByCategory = Object.entries(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category.title]) {
        acc[curr.category.title] = curr.sum;
      } else {
        acc[curr.category.title] = +acc[curr.category.title] + curr.sum;
      }
      return acc;
    }, {})
  ).map(([k, v]) => ({ id: k, title: k, sum: v }));

  return (
    <div className={styles.view}>
      {expenses.length === 0 && (
        <div className={styles.placeholder}>
          <p className={styles.empty}>No Entries to Show Yet!</p>
        </div>
      )}
      <ExpenseRail
        expensesByCategory={empty ? DUMMY_EXP : totalExpensesByCategory}
      />
      <Graph expensesByCategory={empty ? DUMMY_EXP : totalExpensesByCategory} />
      <Info
        expensesByCategory={empty ? DUMMY_EXP : totalExpensesByCategory}
        empty={empty}
      />
    </div>
  );
};

export default SummaryPage;
