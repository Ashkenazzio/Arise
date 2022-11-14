import styles from './QueryFilter.module.css';

const QueryFilter = (props) => {
  const [incomes, setIncomes] = props.summary;
  return (
    <button
      onClick={() => setIncomes(!incomes)}
      className={`${styles.container} ${incomes ? styles.changed : null}`}
    >
      <div className={styles.wrapper}>
        <span className={incomes ? styles.hidden : styles.expenses}>
          Expenses
        </span>
        <span className={!incomes ? styles.hidden : styles.incomes}>
          Incomes
        </span>
      </div>
    </button>
  );
};

export default QueryFilter;
