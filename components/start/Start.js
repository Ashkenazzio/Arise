import styles from './Start.module.css';

const Start = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Get Started</h1>
      </div>

      <div className={styles.view}></div>
    </div>
  );
};

export default Start;
