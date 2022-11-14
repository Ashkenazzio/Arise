import { motion } from 'framer-motion';
import { balanceContainerVars, balanceVars } from 'lib/framer-variants';

import styles from './Balance.module.css';

const Balance = (props) => {
  const [expenses, incomes] = props.queries;

  let totalIncome = 0;
  let totalExpense = 0;

  incomes.map((item) => (totalIncome = totalIncome + item.sum));
  expenses.map((item) => (totalExpense = totalExpense + item.sum));

  const balance = totalIncome.toFixed() - totalExpense.toFixed();
  const isNegative = balance < 0;

  const fill = () => {
    const quotient = totalIncome / totalExpense;

    if (totalExpense === 0 && totalIncome === 0) {
      return 50;
    }

    if (totalExpense === 0) {
      return 100;
    }

    if (quotient <= 0.5) {
      return 0;
    }

    return quotient * 50;
  };

  return (
    <motion.div
      variants={balanceContainerVars}
      className={styles.container}
      style={{
        color: isNegative ? 'var(--clr-error)' : 'var(--clr-success)',
      }}
    >
      <div className={styles.thermo}>
        <div
          className={`${styles.glass} ${isNegative ? styles.negativeBar : ''}`}
        >
          <div
            className={styles.liquid}
            style={{ '--liquid-fill': `${fill() + '%'}` }}
          ></div>
        </div>
      </div>
      <motion.div
        variants={balanceVars}
        className={styles['balance-container']}
      >
        <span className={styles.balance}>
          {balance !== 0 && isNegative ? '-' : '+'}
          {Math.abs(balance).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Balance;
