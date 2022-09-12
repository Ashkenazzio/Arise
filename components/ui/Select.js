import { forwardRef } from 'react';
import styles from './Input.module.css';

const Select = (props, ref) => {
  return (
    <select
      className={styles.input}
      ref={ref}
      {...props}
      onChange={(e) => props.state[1](e.target.value)}
      value={props.state[0].value}
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
