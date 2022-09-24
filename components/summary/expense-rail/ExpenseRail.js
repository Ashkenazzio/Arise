import styles from './ExpenseRail.module.css';

import ExpenseCard from './ExpenseCard';

const ExpenseRail = (props) => {
  return (
    <div className={styles.container}>
      {/* <i className={`${styles.arrow} fa-solid fa-angle-left`} /> */}
      <div className={styles.rail}>
        {props.expensesByCategory.length !== 0 &&
          props.expensesByCategory.map((category) => (
            <ExpenseCard
              key={category.id}
              title={category.title}
              sum={category.sum}
            />
          ))}
      </div>
      {/* <i className={`${styles.arrow} fa-solid fa-angle-right`} /> */}
    </div>
  );
};

export default ExpenseRail;
