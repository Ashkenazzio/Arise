import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['top-bar']}>
        <h1 className={styles.title}>Profile</h1>
      </div>
      <div className={styles.view}></div>
    </div>
  );
};

export default ProfilePage;
