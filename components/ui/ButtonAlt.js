import styles from './Button.module.css';
import Button from './Button';

const ButtonAlt = (props) => {
  return (
    <Button className={`${styles['btn-alt']} ${props.className}`}>
      {props.children}
    </Button>
  );
};

export default ButtonAlt;
