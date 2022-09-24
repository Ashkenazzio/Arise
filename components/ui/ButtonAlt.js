import styles from './Button.module.css';
import Button from './Button';

const ButtonAlt = (props) => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles['btn-alt']} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default ButtonAlt;
