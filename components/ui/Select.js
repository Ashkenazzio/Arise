import { forwardRef } from 'react';
import styles from './Input.module.css';

const Select = (props, ref) => {
  const onChangeHandler = (e) => {
    const { value: optionId, type } = e.target;
    const option = props.options.find((o) => o.id === optionId);
    props.onChange({ value: optionId, payload: option, type });
  };

  return (
    <select
      className={`${styles.input} ${!!props.error && styles.invalid} ${
        !!props.valid && styles.valid
      }`}
      ref={ref}
      {...props}
      onChange={onChangeHandler}
    >
      {props.options.map((option) => (
        <option
          className={styles.option}
          key={option.id}
          id={option.id}
          value={option.id}
        >
          {option.title}
        </option>
      ))}
      ;
    </select>
  );
};

export default forwardRef(Select);
