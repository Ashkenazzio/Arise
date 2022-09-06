import { forwardRef } from 'react';
import styles from './Input.module.css';

const TextArea = (props, ref) => {
  return <textarea className={styles.input} ref={ref} {...props} />;
};

export default forwardRef(TextArea);
