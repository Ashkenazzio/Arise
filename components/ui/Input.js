import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = (props, ref) => {
  return <input className={styles.input} ref={ref} {...props} />;
};

export default forwardRef(Input);
