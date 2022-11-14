import styles from './ChangeCredentials.module.css';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const ChangeCredentials = (props) => {
  const eightCharacters = (value) => value;

  const {
    value: enteredConfirm,
    isValid: confirmIsValid,
    hasError: confirmInputInvalid,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
  } = useInput(eightCharacters);

  const changeCredentialsHandler = (e) => {
    e.preventDefault();

    props.onChangeCredential(enteredConfirm.value, props.changeUser.user);
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Are You Sure?</h3>
      <div className={styles.input}>
        <FormField
          title='Password:'
          info='Please enter your current password to confirm changes.'
          id='confirm-changes'
          type='password'
          value={enteredConfirm.value}
          onChange={confirmChangeHandler}
          onBlur={confirmBlurHandler}
          error={
            props.feedback
              ? props.feedback
              : confirmInputInvalid
              ? confirmInputInvalid
              : undefined
          }
          valid={confirmIsValid ? confirmIsValid : undefined}
        />
      </div>
      {props.feedback && (
        <div className={styles.feedback}>{props.feedback}</div>
      )}
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>back</ButtonAlt>
        <Button disabled={!confirmIsValid} onClick={changeCredentialsHandler}>
          confirm changes
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeCredentials;
