import styles from './ChangeCredentials.module.css';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import { useState } from 'react';

const ChangePassword = (props) => {
  const [showInput, setShowInput] = useState(false);

  const [changeUser, setChangeUser] = props.change;

  const eightCharacters = (value) => value?.trim().length >= 8;

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(eightCharacters);

  const isEquelToPassword = (value) =>
    value === enteredPassword.value && value?.trim().length >= 8;

  const {
    value: confirmPassword,
    isValid: confirmIsValid,
    hasError: confirmInputInvalid,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
  } = useInput(isEquelToPassword);

  const changePasswordHandler = (e) => {
    e.preventDefault();

    setChangeUser({
      user: { ...changeUser.user, password: enteredPassword.value },
      change: true,
    });
    props.onClose();
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Change Password</h3>
      <div className={styles.input}>
        <FormField
          title='New Password:'
          id='change-password'
          type={showInput ? 'text' : 'password'}
          min='8'
          value={enteredPassword.value}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordInputInvalid ? passwordInputInvalid : undefined}
          valid={passwordIsValid ? passwordIsValid : undefined}
        />

        <FormField
          title='Confirm Password:'
          id='confirm-password'
          type={showInput ? 'text' : 'password'}
          min='8'
          value={confirmPassword.value}
          onChange={confirmChangeHandler}
          onBlur={confirmBlurHandler}
          error={confirmInputInvalid ? confirmInputInvalid : undefined}
          valid={confirmIsValid ? confirmIsValid : undefined}
        />
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>cancel</ButtonAlt>
        <Button
          disabled={!passwordIsValid || !confirmIsValid}
          onClick={changePasswordHandler}
        >
          change
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePassword;
