import { forwardRef } from 'react';
import styles from './Toggle.module.css';

const Toggle = (props, ref) => {
  return (
    <label className={styles.switch}>
      <input type='checkbox' className={styles.checkbox} ref={ref} />
      <span className={styles.slider} off='-' on='+'></span>
    </label>
  );
};

export default forwardRef(Toggle);

// https://alvarotrigo.com/blog/toggle-switch-css/
