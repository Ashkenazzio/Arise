import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { backdropVars, modalVars } from 'lib/framer-variants';

import styles from './Modal.module.css';

const Overlay = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVars}
        className={styles.backdrop}
        onClick={props.onClose}
      >
        <motion.div
          variants={modalVars}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${styles.content} ${props.className}`}>
            {props.children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Modal = (props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <Overlay className={props.className} onClose={props.onClose}>
        {props.children}
      </Overlay>,
      document.getElementById('overlays')
    );
  } else {
    return null;
  }
};

export default Modal;
