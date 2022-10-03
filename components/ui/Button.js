import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = (props, ref) => {
  return (
    <button ref={ref} {...props} className={`${styles.btn} ${props.className}`}>
      {props.children}
    </button>
  );
};

export default forwardRef(Button);
