import { forwardRef, useState } from 'react';
import styles from './Input.module.css';

const Password = (props, ref) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className={styles.container}>
      <input
        className={`${styles.input} ${!!props.error && styles.invalid} ${
          !!props.valid && styles.valid
        }`}
        ref={ref}
        {...props}
        type={!showInput ? 'password' : 'text'}
      />
      <i
        onClick={() => {
          setShowInput(!showInput);
        }}
        className={`fa-solid ${!showInput ? 'fa-eye' : 'fa-eye-slash'} ${
          styles.reveal
        }`}
      ></i>
    </div>
  );
};

export default forwardRef(Password);
