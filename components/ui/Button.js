import styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.btn} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
