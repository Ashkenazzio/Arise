import styles from './Config.module.css';

const Config = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.view}></div>
    </div>
  );
};

export default Config;
