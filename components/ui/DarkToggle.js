import { forwardRef } from 'react';
import styles from './DarkToggle.module.css';

const DarkToggle = (props, ref) => {
  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        className={styles.checkbox}
        onChange={props.onChange}
        checked={props.checked}
        ref={ref}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default forwardRef(DarkToggle);
