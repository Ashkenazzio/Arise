import styles from './AddCategory.module.css';
import { useState } from 'react';
import { useAuthUser } from 'context/AuthContext';
import useInput from 'hooks/use-input';

import Modal from '@/ui/Modal';
import FormField from '@/ui/FormField';
import ButtonAlt from '@/ui/ButtonAlt';
import Button from '@/ui/Button';

const isNotEmpty = (value) => value?.trim() !== '';

const AddCategory = (props) => {
  const [authUser] = useAuthUser();
  const [expenseCategories, setExpenseCategories] = props.expenseCategories;
  const [incomeCategories, setIncomeCategories] = props.incomeCategories;

  const [checked, setChecked] = useState(false);

  const {
    value: enteredCategory,
    isValid: categoryIsValid,
    hasError: categoryInputInvalid,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput(isNotEmpty);

  const addCategoryHandler = (e) => {
    e.preventDefault();

    const newCategory = enteredCategory;
    const enteredList = checked ? 'incomes' : 'expenses';

    if (authUser) {
      // db...
    } else {
      if (enteredList === 'expenses') {
        localStorage.setItem(
          'expense-categories',
          JSON.stringify([
            ...expenseCategories,
            { id: Date.now(), title: enteredCategory.value },
          ])
        );

        setExpenseCategories(
          JSON.parse(localStorage.getItem('expense-categories'))
        );
      } else {
        localStorage.setItem(
          'income-categories',
          JSON.stringify([
            ...incomeCategories,
            { id: Date.now(), title: enteredCategory.value },
          ])
        );

        setIncomeCategories(
          JSON.parse(localStorage.getItem('income-categories'))
        );
      }
    }

    props.onClose();
    // props.onAddItem(newCategory, enteredList);
  };

  return (
    <Modal className={styles.container} onClose={props.onClose}>
      <h3 className={styles.title}>Add a new category:</h3>
      <div className={styles.input}>
        <FormField
          title='Category Title:'
          id='add-category'
          type='text'
          value={enteredCategory.value}
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          error={categoryInputInvalid ? categoryInputInvalid : undefined}
          valid={categoryIsValid ? categoryIsValid : undefined}
        />
        <FormField
          title='Expense/Income:'
          id='list-type'
          type='checkbox'
          className={styles.toggle}
          onChange={() => setChecked(!checked)}
        />
      </div>
      <div className={styles.actions}>
        <ButtonAlt onClick={props.onClose}>CANCEL</ButtonAlt>
        <Button disabled={!categoryIsValid} onClick={addCategoryHandler}>
          ADD CATEGORY
        </Button>
      </div>
    </Modal>
  );
};

export default AddCategory;
