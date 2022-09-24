import { forwardRef } from 'react';
import styles from './Input.module.css';

const TextArea = (props, ref) => {
  return (
    <textarea
      className={`${styles.input} ${!!props.error && styles.invalid} ${
        !!props.valid && styles.valid
      }`}
      ref={ref}
      {...props}
    />
  );
};

export default forwardRef(TextArea);
