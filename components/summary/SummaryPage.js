import styles from './SummaryPage.module.css';

import ExpenseRail from './expense-rail/ExpenseRail';
import Graph from './data-vis/Graph';
import Info from './info/Info';

const SummaryPage = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Summary</h1>
      </div>
      <div className={styles.view}>
        <ExpenseRail />
        <Graph />
        <Info />
      </div>
    </div>
  );
};

export default SummaryPage;
