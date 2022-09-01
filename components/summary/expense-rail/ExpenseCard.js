import styles from './ExpenseCard.module.css';

const ExpenseCard = (props) => {
  return (
    <div className={styles['expense-card']}>
      <i className={`${styles.icon} fa-solid fa-wallet`}></i>
      <div className={styles.details}>
        <span className={styles.amount}>$999</span>
        <span className={styles.label}>total</span>

        <span className={`${styles.trend} icon-before`}>-120%</span>
      </div>
    </div>
  );
};

export default ExpenseCard;
