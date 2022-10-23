import { useSession } from 'next-auth/react';
import styles from './Info.module.css';

import Note from './Note';

const Info = (props) => {
  const authUser = useSession()?.data?.user?.isLoggedIn;

  return (
    <div className={styles.container}>
      {!authUser && !props.empty && (
        <div className={styles.placeholder}>
          <p className={styles.empty}>
            This Feature Is Not Yet Available In Anonymous Sessions
          </p>
        </div>
      )}

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
