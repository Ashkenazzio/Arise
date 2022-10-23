import styles from './EntryForm.module.css';
import { useState } from 'react';
import useInput from 'hooks/use-input';

import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import FormField from '@/ui/FormField';
import AddCategory from './AddCategory';

const stringIsNotEmpty = (value) => value?.trim() !== '';
const numIsNotZero = (value) => value !== '' && value !== 0;
const positiveNumber = (value) => +value > 0;

const EntryForm = (props) => {
  const [checked, setChecked] = useState(false);
  const [addCategory, setAddCategoty] = useState(false);

  const expenseCategories = props.categories.filter(
    (category) => category.type === 'expense'
  );
  const incomeCategories = props.categories.filter(
    (category) => category.type === 'income'
  );

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleInputInvalid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(stringIsNotEmpty);

  const {
    value: enteredSum,
    isValid: sumIsValid,
    hasError: sumInputInvalid,
    valueChangeHandler: sumChangeHandler,
    inputBlurHandler: sumBlurHandler,
    reset: resetSumInput,
  } = useInput(positiveNumber);

  const {
    value: enteredDate,
    isValid: dateIsValid,
    hasError: dateInputInvalid,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput(stringIsNotEmpty);

  const {
    value: selectedCategory,
    isValid: categoryIsValid,
    hasError: categoryInputInvalid,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput(numIsNotZero);

  const {
    value: enteredNotes,
    valueChangeHandler: notesChangeHandler,
    reset: resetNotesInput,
  } = useInput(() => true);

  let formIsValid = false;

  if (titleIsValid && sumIsValid && dateIsValid && categoryIsValid) {
    formIsValid = true;
  }

  const categoryModalHandler = () => {
    setAddCategoty(!addCategory);
  };

  const resetHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    resetTitleInput();
    resetSumInput();
    resetDateInput();
    resetCategoryInput();
    resetNotesInput();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const queryData = {
      title: enteredTitle.value,
      sum: +enteredSum.value,
      date: enteredDate.value,
      category: selectedCategory.payload,
      notes: enteredNotes.value,
    };

    const enteredList = checked ? 'incomes' : 'expenses';

    props.onAddItem(queryData, enteredList);
    resetHandler();
  };

  return (
    <div className={styles.view}>
      <h2 className={styles.heading}>Add a new entry</h2>
      <form className={styles.form}>
        <FormField
          title='Title'
          id='title'
          info='Choose a title.'
          type='text'
          value={enteredTitle.value}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleInputInvalid ? titleInputInvalid : undefined}
          valid={titleIsValid ? titleIsValid : undefined}
        />

        <FormField
          title='Expense/Income'
          id='list'
          info='Choose to add an expense or an income.'
          type='checkbox'
          onChange={() => setChecked(!checked)}
        />

        <FormField
          title='Sum'
          id='sum'
          info='Add the cost or gain in positive numbers.'
          type='number'
          min='0'
          value={enteredSum.value}
          onChange={sumChangeHandler}
          onBlur={sumBlurHandler}
          error={sumInputInvalid ? sumInputInvalid : undefined}
          valid={sumIsValid ? sumIsValid : undefined}
        />

        <FormField
          title='Date'
          id='date'
          info='Pick a date.'
          type='date'
          value={enteredDate.value}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          error={dateInputInvalid ? dateInputInvalid : undefined}
          valid={dateIsValid ? dateIsValid : undefined}
        />

        <FormField
          title='Category'
          id='category'
          info='Choose or create a category.'
          type='select'
          options={!checked ? expenseCategories : incomeCategories}
          value={selectedCategory.value}
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          error={categoryInputInvalid ? categoryInputInvalid : undefined}
          valid={categoryIsValid ? categoryIsValid : undefined}
          onAddCategory={categoryModalHandler}
        />

        <FormField
          title='Notes (Optional)'
          id='notes'
          info='Add additional information if you have any.'
          type='textarea'
          value={enteredNotes.value}
          onChange={notesChangeHandler}
        />
        <div className={styles.actions}>
          <ButtonAlt onClick={resetHandler}>CLEAR</ButtonAlt>
          <Button disabled={!formIsValid} onClick={submitHandler}>
            ADD
          </Button>
        </div>
        {addCategory && (
          <AddCategory
            onClose={categoryModalHandler}
            onAddCategory={props.onAddCategory}
          />
        )}
      </form>
    </div>
  );
};

export default EntryForm;
