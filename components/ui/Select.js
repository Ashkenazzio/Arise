import { forwardRef } from 'react';
import styles from './Input.module.css';

const Select = (props, ref) => {
  return (
    <select
      className={`${styles.input} ${!!props.error && styles.invalid} ${
        !!props.valid && styles.valid
      }`}
      ref={ref}
      {...props}
    >
      {props.options.map((option) => (
        <option className={styles.option} key={option.key} value={option.value}>
          {option.name}
        </option>
      ))}
      ;
    </select>
  );
};

export default forwardRef(Select);
