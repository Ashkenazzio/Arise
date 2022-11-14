import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { noteVars } from 'lib/framer-variants';

import styles from './Note.module.css';
import ButtonAlt from 'components/ui/ButtonAlt';
import Button from 'components/ui/Button';

const Note = (props) => {
  const noteRef = useRef();

  const closeHandler = (e) => {
    noteRef.current.style.display = 'none';
    props.close();
  };

  const expense = props.list === 'Expenses';
  const above = props.category.trend > 0;

  const positiveExpAdvice = `Decreasing your expenses is often the fastest way to improve your financial condition. Keep it up! 💪🏻`;
  const negativeExpAdvice = `No worries, keep trying with your goals in mind and you'll see results eventually 🙏🏻`;
  const positiveIncAdvice = `Increasing and diversifying your income is a great way to keep your financial condition stable at all times. Keep it up! 💪🏻`;
  const negativeIncAdvice = `No worries, keep trying with your goals in mind and you'll see results eventually 🙏🏻`;

  return (
    <AnimatePresence>
      <motion.div
        variants={noteVars}
        ref={noteRef}
        className={styles.container}
      >
        <ButtonAlt onClick={closeHandler} className={styles.close}>
          <i className='fa-solid fa-xmark'></i>
        </ButtonAlt>
        <span className={styles.title}>Did you notice?</span>
        <p className={styles.body}>
          <span>
            Apparantly your {expense ? 'expenses on' : 'income from'}{' '}
            <span className={styles.category}> {props.category.title}</span>{' '}
            have{' '}
            {above ? (
              <span className={expense ? styles.bad : styles.good}>
                increased
              </span>
            ) : (
              <span className={expense ? styles.good : styles.bad}>
                decreased
              </span>
            )}{' '}
            by{' '}
            <span
              className={
                above
                  ? expense
                    ? styles.bad
                    : styles.good
                  : expense
                  ? styles.good
                  : styles.bad
              }
            >
              {Math.abs(
                props.category.trend.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              )}
              %!
            </span>
          </span>
          <span className={styles.advice}>
            {above
              ? expense
                ? negativeExpAdvice
                : positiveIncAdvice
              : expense
              ? positiveExpAdvice
              : negativeIncAdvice}
          </span>
        </p>
        <Button className={styles.btn} onClick={closeHandler}>
          got it
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Note;
