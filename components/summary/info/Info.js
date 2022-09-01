import styles from './Info.module.css';

import Note from './Note';

const Info = (props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.label}>Useful Information</h3>
      <div className={styles.rail}>
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  );
};

export default Info;
