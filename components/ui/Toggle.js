import { forwardRef } from 'react';
import styles from './Toggle.module.css';

const Toggle = (props, ref) => {
  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        className={styles.checkbox}
        ref={ref}
        onChange={props.onChange}
      />
      <span onClick={props.onClick} className={styles.slider}></span>
    </label>
  );
};

export default forwardRef(Toggle);

// https://alvarotrigo.com/blog/toggle-switch-css/
