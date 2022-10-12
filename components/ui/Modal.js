import styles from './Modal.module.css';

import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.content} ${props.className}`}>
        {props.children}
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
    return (
      <>
        {ReactDOM.createPortal(
          <Backdrop onClose={props.onClose} />,
          document.getElementById('overlays')
        )}
        {ReactDOM.createPortal(
          <ModalOverlay className={props.className}>
            {props.children}
          </ModalOverlay>,
          document.getElementById('overlays')
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Modal;
