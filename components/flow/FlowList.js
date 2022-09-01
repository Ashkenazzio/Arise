import styles from './FlowList.module.css';

const FlowList = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Flow</h1>
      </div>

      <div className={styles.view}></div>
    </div>
  );
};

export default FlowList;
