import styles from './Modal.module.css';

import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

const Overlay = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.content} ${props.className}`}>
          {props.children}
        </div>
      </div>
    </div>
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
