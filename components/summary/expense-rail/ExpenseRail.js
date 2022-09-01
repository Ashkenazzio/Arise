import styles from './ExpenseRail.module.css';

import ExpenseCard from './ExpenseCard';

const ExpenseRail = (props) => {
  return (
    <div className={styles.container}>
      <i className={`${styles.arrow} fa-solid fa-angle-left`} />
      <div className={styles.rail}>
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </div>
      <i className={`${styles.arrow} fa-solid fa-angle-right`} />
    </div>
  );
};

export default ExpenseRail;
