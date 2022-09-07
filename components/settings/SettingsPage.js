import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.view}></div>
    </div>
  );
};

export default SettingsPage;
