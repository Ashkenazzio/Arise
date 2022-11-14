import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Prompt.module.css';
import Button from './Button';
import { backdropVars, modalVars } from 'lib/framer-variants';

const Overlay = (props) => {
  return (
    <motion.div
      variants={backdropVars}
      exit='exit'
      className={styles.backdrop}
      onClick={props.onClose}
    >
      <motion.div
        variants={modalVars}
        exit='hidden'
        className={`${styles.modal} ${!props.ok ? styles.error : undefined}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.content}>
          <h2>{props.ok ? 'Success!' : 'Whoops!'}</h2>
          <p>{props.message}</p>
          <Button
            onClick={props.onClose}
            className={!props.ok ? styles['btn-error'] : styles.btn}
          >
            OK
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Prompt = (props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <Overlay
        {...props}
        className={props.className}
        onClose={props.onClose}
      />,
      document.getElementById('overlays')
    );
  } else {
    return null;
  }
};

export default Prompt;
