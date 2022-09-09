import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';
import { useDb } from 'context/DbContext';

const SummaryPage = (props) => {
  const [expenses, incomes] = useDb();

  const totalExpensesByCategory = Object.entries(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = curr.sum;
      } else {
        acc[curr.category] = +acc[curr.category] + curr.sum;
      }
      return acc;
    }, {})
  ).map(([k, v]) => ({ title: k, sum: v }));

  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Summary</h1>
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
