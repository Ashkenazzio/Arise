import Button from 'components/ui/Button';
import ButtonAlt from 'components/ui/ButtonAlt';
import styles from './Note.module.css';

const Note = (props) => {
  return (
    <div className={styles.container}>
      <ButtonAlt className={styles.close}>
        <i className='fa-solid fa-xmark'></i>
      </ButtonAlt>
      <span className={styles.title}>Dialog Title</span>
      <p className={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eget iaculis
        eget eget neque, posuere quis placerat arcu.
      </p>
      <Button>GOT IT</Button>
    </div>
  );
};

export default Note;
