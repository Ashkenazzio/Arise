import { forwardRef } from 'react';
import styles from './Input.module.css';

const Select = (props, ref) => {
  const onChangeHandler = (e) => {
    const { value: optionId, type } = e.target;
    const option = props.options.find((o) => o.id == optionId);
    props.onChange({ value: optionId, payload: option, type });
  };

  return (
    <div className={styles.container}>
      <select
        className={`${styles.input} ${!!props.error && styles.invalid} ${
          !!props.valid && styles.valid
        }`}
        ref={ref}
        onChange={onChangeHandler}
      >
        <option className={styles.option} key={0} id={0} value={0}>
          Choose a category...
        </option>
        {props.options.map((option) => (
          <option
            className={`${styles.option} icon-before`}
            key={option.id}
            id={option.id}
            value={option.id}
          >
            {`${option.icon} ${option.label}`}
          </option>
        ))}
      </select>
      <i
        onClick={props.onAddCategory}
        className={`fa-solid fa-circle-plus ${styles.add}`}
      ></i>
    </div>
  );
};

export default forwardRef(Select);
