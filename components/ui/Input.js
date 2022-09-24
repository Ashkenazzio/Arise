import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = (props, ref) => {
  return (
    <input
      className={`${styles.input} ${!!props.error && styles.invalid} ${
        !!props.valid && styles.valid
      }`}
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(Input);
