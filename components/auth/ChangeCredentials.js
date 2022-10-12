import styles from './ChangeCredentials.module.css';
import { useAuthUser } from 'context/AuthContext';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const ChangeCredentials = (props) => {
  const [authUser] = useAuthUser();

  const isConfirmPassword = (value) => value === authUser.password;

  const {
    value: enteredConfirm,
    isValid: confirmIsValid,
    hasError: confirmInputInvalid,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
  } = useInput(isConfirmPassword);

  const changeCredentialsHandler = (e) => {
    e.preventDefault();

    props.onChangeCredential();
    props.onClose();
    props.reset();
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Are You Sure?</h3>
      <div className={styles.input}>
        <FormField
          title='Password:'
          info='Please enter your current password to confirm changes.'
          id='confirm-changes'
          type='text'
          value={enteredConfirm.value}
          onChange={confirmChangeHandler}
          onBlur={confirmBlurHandler}
          error={confirmInputInvalid ? confirmInputInvalid : undefined}
          valid={confirmIsValid ? confirmIsValid : undefined}
        />
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>BACK</ButtonAlt>
        <Button disabled={!confirmIsValid} onClick={changeCredentialsHandler}>
          CONFIRM CHANGES
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeCredentials;
