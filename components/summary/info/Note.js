import Button from 'components/ui/Button';
import ButtonAlt from 'components/ui/ButtonAlt';
import { useRef } from 'react';
import styles from './Note.module.css';

const Note = () => {
  const noteRef = useRef();

  const closeHandler = (e) => {
    noteRef.current.style.display = 'none';
  };

  return (
    <div ref={noteRef} className={styles.container}>
      <ButtonAlt onClick={closeHandler} className={styles.close}>
        <i className='fa-solid fa-xmark'></i>
      </ButtonAlt>
      <span className={styles.title}>Dialog Title</span>
      <p className={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eget iaculis
        eget eget neque, posuere quis placerat arcu.
      </p>
      <Button onClick={closeHandler}>GOT IT</Button>
    </div>
  );
};

export default Note;
