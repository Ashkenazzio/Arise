import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useEffect, useState } from 'react';
import { DUMMY_EXP } from 'lib/initData';

const SummaryPage = (props) => {
  const expenses = props.expenses;

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (expenses.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [expenses]);

  const totalExpensesByCategory = Object.entries(
    expenses.reduce((acc, curr) => {
      !acc[curr.category.label]
        ? (acc[curr.category.label] = curr.sum)
        : (acc[curr.category.label] = +acc[curr.category.label] + curr.sum);
      return acc;
    }, {})
  ).map(([k, v]) => ({ id: k, title: k, sum: v }));



  return (
    <div className={styles.view}>
      {empty && (
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
