import styles from './AddCategory.module.css';
import { useState, useRef } from 'react';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import ButtonAlt from '@/ui/ButtonAlt';
import Button from '@/ui/Button';

const isNotEmpty = (value) => value?.trim() !== '';

const AddCategory = (props) => {
  const [checked, setChecked] = useState(false);

  const addCategoryHandler = (e) => {
    e.preventDefault();

    const queryData = {
      label: enteredCategory.value,
      type: checked ? 'income' : 'expense',
      icon: '💸',
    };

    props.onAddCategory(queryData);
    props.onClose();
  };

  const {
    value: enteredCategory,
    isValid: categoryIsValid,
    hasError: categoryInputInvalid,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput(isNotEmpty);

  const [emoji, setEmoji] = useState('💸');
  const emojiPicker = useRef();

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Add a new category:</h3>
      <div className={styles.input}>
        <div className={styles.picker}>
          <span className={styles['emoji-title']}>Emoji:</span>
          <div ref={emojiPicker} className={styles.emoji}>
            {emoji}
          </div>
        </div>
        <FormField
          title='Expense/Income:'
          id='list-type'
          type='checkbox'
          className={styles.toggle}
          onChange={() => setChecked(!checked)}
        />
        <FormField
          title='Title:'
          id='add-category'
          type='text'
          value={enteredCategory.value}
          maxLength='32'
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          error={categoryInputInvalid ? 1 : undefined}
          valid={categoryIsValid ? 1 : undefined}
        />
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>cancel</ButtonAlt>
        <Button disabled={!categoryIsValid} onClick={addCategoryHandler}>
          add category
        </Button>
      </div>
    </Modal>
  );
};

export default AddCategory;
