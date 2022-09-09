import { useDb } from 'context/DbContext';
import styles from './Balance.module.css';

const Balance = (props) => {
  const [expenses, incomes] = useDb();

  let totalIncome = 0;
  let totalExpense = 0;

  expenses.map((item) => (totalExpense = totalExpense + item.sum));
  incomes.map((item) => (totalIncome = totalIncome + item.sum));

  const balance = totalIncome - totalExpense;
  const isPositive = balance >= 0;

  const liquidHeight = () => {
    const quotient = totalIncome / totalExpense;

    if (quotient <= 0.5) {
      return 0;
    }
    return quotient * 50;
  };

  console.log(liquidHeight());

  return (
    <div
      className={styles.container}
      style={{
        color: isPositive ? 'var(--clr-success)' : 'var(--clr-error)',
      }}
    >
      <div className={styles.thermo}>
        <div
          className={`${styles.glass} ${isPositive ? styles.positiveBar : ''}`}
        >
          <div
            className={styles.liquid}
            style={{ height: `${liquidHeight() + '%'}` }}
          ></div>
        </div>
      </div>
      <div className={styles['balance-container']}>
        <span className={styles.balance}>{`${
          isPositive ? '+' : ''
        } ${balance.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`}</span>
      </div>
    </div>
  );
};

export default Balance;
