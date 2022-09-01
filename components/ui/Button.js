import styles from './Button.module.css';

const Button = (props) => {
  return (
    <div className={`${styles.btn} ${props.className}`}>{props.children}</div>
  );
};

export default Button;
