import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

import styles from './Prompt.module.css';
import Button from './Button';

const Overlay = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onClose}>
      <div
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
      </div>
    </div>
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
