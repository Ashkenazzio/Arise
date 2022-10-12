import styles from './DeletePrompt.module.css';

import Modal from '@/ui/Modal';
import Button from '@/ui/Button';

const DeletePrompt = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>
          Are You Sure You Want To Delete This Entry?
        </h3>
        <div className={styles.actions}>
          <Button onClick={props.onClose}>NO</Button>
          <Button className={styles.delete} onClick={props.onDelete}>
            YES
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePrompt;
