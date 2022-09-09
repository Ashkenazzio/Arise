import { useDb } from 'context/DbContext';
import Balance from './Balance';
import FlowBlock from './FlowBlock';
import styles from './FlowLists.module.css';

const FlowLists = () => {
  const [expenses, incomes] = useDb();

  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Flow</h1>
      </div>

      <div className={styles.view}>
        <FlowBlock queries={expenses} icon={String.fromCharCode(0xf068)} />
        <FlowBlock queries={incomes} icon={String.fromCharCode(0x2b)} />
        <Balance />
      </div>
    </div>
  );
};

export default FlowLists;
