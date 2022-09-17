import { useDb } from 'context/DbContext';
import styles from './Balance.module.css';

const Balance = (props) => {
  const [expenses, incomes] = useDb();

  let totalIncome = 0;
  let totalExpense = 0;

  incomes.map((item) => (totalIncome = totalIncome + item.sum));
  expenses.map((item) => (totalExpense = totalExpense + item.sum));

  const balance = totalIncome.toFixed() - totalExpense.toFixed();
  const isPositive = balance >= 0;

  const fill = () => {
    const quotient = totalIncome / totalExpense;

    if (quotient <= 0.5) {
      return 0;
    }
    return quotient * 50;
  };

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
            style={{ height: `${fill() + '%'}` }}
          ></div>
        </div>
      </div>
      <div className={styles['balance-container']}>
        <span className={styles.balance}>{`${isPositive ? '+' : '-'} ${Math.abs(
          balance
        ).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`}</span>
      </div>
    </div>
  );
};

export default Balance;
