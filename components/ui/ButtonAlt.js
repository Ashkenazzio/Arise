import { forwardRef } from 'react';
import styles from './Button.module.css';

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
