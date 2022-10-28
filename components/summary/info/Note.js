import Button from 'components/ui/Button';
import ButtonAlt from 'components/ui/ButtonAlt';
import { useRef } from 'react';
import styles from './Note.module.css';

const Note = (props) => {
  const noteRef = useRef();

  const closeHandler = (e) => {
    noteRef.current.style.display = 'none';
    props.close();
  };

  const negative = props.category.trend > 0 ? true : false;

  return (
    <div ref={noteRef} className={styles.container}>
      <ButtonAlt onClick={closeHandler} className={styles.close}>
        <i className='fa-solid fa-xmark'></i>
      </ButtonAlt>
      <span className={styles.title}>Did you notice?</span>
      <p className={styles.body}>
        <span>
          Looks like your expenses on{' '}
          <span className={styles.category}> {props.category.title}</span> have{' '}
          {negative ? (
            <span className={styles.bad}>increased</span>
          ) : (
            <span className={styles.good}>decreased</span>
          )}{' '}
          by{' '}
          <span className={negative ? styles.bad : styles.good}>
            {Math.abs(
              props.category.trend.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            )}
            %!
          </span>
        </span>
        <span className={styles.advice}>
          {negative ? `Be Aware!!` : 'How Nice!'}
        </span>
      </p>
      <Button onClick={closeHandler}>GOT IT</Button>
    </div>
  );
};

export default Note;
