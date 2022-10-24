import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useEffect, useState } from 'react';
import { queryTotalByCategory, getTrend } from 'lib/queryFilters';
import { DUMMY_QUERIES } from 'lib/initData';
import Link from 'next/link';

const SummaryPage = (props) => {
  const [expenses, expenseCompares] = props.expenses;
  // const [incomes, incomeCompares] = props.incomes;
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (expenses.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [expenses]);

  const expensesTotalByCategory = queryTotalByCategory(expenses);
  const expenseComparesTotalByCategory = queryTotalByCategory(expenseCompares);
  const expensesByCategoryWithTrend = getTrend(
    expenseComparesTotalByCategory,
    expensesTotalByCategory
  );

  // const incomesTotalByCategory = queryTotalByCategory(incomes);
  // const incomeComparesTotalByCategory = queryTotalByCategory(incomeCompares);F
  // const incomesByCategoryWithTrend = getTrend(
  //   incomeComparesTotalByCategory,
  //   incomesTotalByCategory
  // );

  return (
    <div className={styles.view}>
      {empty && (
        <div className={styles.placeholder}>
          <div className={styles.message}>
            <h3>Nothing to Show Yet!</h3>
            <p>You need to add entries to make use of the Summary section.</p>
            <Link href={'/add'}>
              <span className={styles.link}>Click Here To Add Entries</span>
            </Link>
          </div>
        </div>
      )}
      <ExpenseRail
        expensesByCategory={
          empty ? DUMMY_QUERIES.expenses.array : expensesByCategoryWithTrend
        }
        // incomesByCategory={
        //   empty ? DUMMY_QUERIES.expenses.array : incomesByCategoryWithTrend
        // }
      />
      <Graph
        expensesByCategory={
          empty ? DUMMY_QUERIES.expenses.array : expensesTotalByCategory
        }
        // incomesByCategory={
        //   empty ? DUMMY_QUERIES.expenses.array : incomesTotalByCategory
        // }
      />
      <Info
        expensesByCategory={
          empty ? DUMMY_QUERIES.expenses.array : expensesByCategoryWithTrend
        }
        // incomesByCategory={
        //   empty ? DUMMY_QUERIES.expenses.array : incomesByCategoryWithTrend
        // }
      />
    </div>
  );
};

export default SummaryPage;
