import { forwardRef } from 'react';
import styles from './DarkToggle.module.css';

const DarkToggle = (props, ref) => {
  return (
    <label className={styles.switch}>
        <input type='checkbox' className={styles.checkbox} ref={ref} />
        <span className={styles.slider} off='-' on='+'></span>
    </label>
  );
};

export default forwardRef(DarkToggle);

// https://alvarotrigo.com/blog/toggle-switch-css/
