import styles from './ChangeCredentials.module.css';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const isNotEmpty = (value) => value?.trim() !== '';

const ChangeName = (props) => {
  const [changeUser, setChangeUser] = props.change;

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const changeNameHandler = (e) => {
    e.preventDefault();

    setChangeUser({
      user: { ...changeUser.user, name: enteredName.value },
      change: true,
    });
    props.onClose();
    console.log(changeUser);
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Change Name</h3>
      <div className={styles.input}>
        <FormField
          title='New Name:'
          id='change-name'
          type='text'
          value={enteredName.value}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameInputInvalid ? nameInputInvalid : undefined}
          valid={nameIsValid ? nameIsValid : undefined}
        />
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>CANCEL</ButtonAlt>
        <Button disabled={!nameIsValid} onClick={changeNameHandler}>
          CHANGE
        </Button>
      </div>
    </Modal>
  );
};

export default ChangeName;
