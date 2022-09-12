import styles from './SummaryPage.module.css';
import { useState } from 'react';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useDb } from 'context/DbContext';
import Select from '@/ui/Select';

const SummaryPage = (props) => {
  const sortOpts = [
    { key: '1', name: 'Today', value: 'today' },
    { key: '2', name: 'Last 7 days', value: 'last-7' },
    { key: '3', name: 'Last 30 days', value: 'last-30' },
    { key: '4', name: 'This Year', value: 'last-y' },
  ];

  const [sort, setSort] = useState('today');

  const [expenses] = useDb();

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
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Summary</h1>
        <Select
          className={styles.sort}
          state={[sort, setSort]}
          options={sortOpts}
        />
      </div>
      <div className={styles.view}>
        <ExpenseRail expensesByCategory={totalExpensesByCategory} />
        <Graph expensesByCategory={totalExpensesByCategory} />
        <Info expensesByCategory={totalExpensesByCategory} />
      </div>
    </div>
  );
};

export default SummaryPage;
