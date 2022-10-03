import styles from './Button.module.css';
import Button from './Button';
import { forwardRef } from 'react';

const ButtonAlt = (props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={`${styles.btn} ${styles['btn-alt']} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default forwardRef(ButtonAlt);
