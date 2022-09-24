import styles from './EntryForm.module.css';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

import { useRef, useState } from 'react';
import useInput from 'hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';

const EntryForm = (props) => {
  const [categoryOpts, setCategoryOpts] = useState([
    {
      key: 'c0',
      name: 'Please choose a category...',
      value: '',
    },
    { key: 'c1', name: '🍴 Eating Out', value: 'eating-out' },
    { key: 'c2', name: '😊 Fun', value: 'fun' },
    { key: 'c3', name: '🛒 Groceries', value: 'groceries' },
    { key: 'c4', name: '📃 Insurance', value: 'insurance' },
    { key: 'c5', name: '💊 Pharma', value: 'pharma' },
    { key: 'c6', name: '🚌 Transport', value: 'transport' },
    { key: 'c7', name: '⚡ Utilities', value: 'utilities' },
    { key: 'c8', name: '♾ Misc.', value: 'miscellaneous' },
  ]);

  const listRef = useRef();

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleInputInvalid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredSum,
    isValid: sumIsValid,
    hasError: sumInputInvalid,
    valueChangeHandler: sumChangeHandler,
    inputBlurHandler: sumBlurHandler,
    reset: resetSumInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredDate,
    isValid: dateIsValid,
    hasError: dateInputInvalid,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredCategory,
    isValid: categoryIsValid,
    hasError: categoryInputInvalid,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredNotes,
    isValid: notesIsValid,
    hasError: notesInputInvalid,
    valueChangeHandler: notesChangeHandler,
    inputBlurHandler: notesBlurHandler,
    reset: resetNotesInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    titleIsValid &&
    sumIsValid &&
    dateIsValid &&
    notesIsValid &&
    categoryIsValid
  ) {
    formIsValid = true;
  }

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
      title: enteredTitle,
      sum: enteredSum,
      date: enteredDate,
      category: enteredCategory,
      notes: enteredNotes,
    };

    const enteredList = listRef.current.checked ? 'incomes' : 'expenses';

    resetHandler();
    props.onAddItem(queryData, enteredList);
  };

  return (
    <div className={styles.view}>
      <h2 className={styles.heading}>Add a new entry</h2>
      <form
        className={styles.form}
        // onSubmit={submitHandler}
      >
        <FormField
          title='Title'
          info='Choose a title.'
          type='text'
          value={enteredTitle}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleInputInvalid ? titleInputInvalid : undefined}
          valid={titleIsValid ? titleIsValid : undefined}
        />

        <FormField
          ref={listRef}
          title='Expense/Income'
          info='Choose to add an expense or income.'
          type='checkbox'
        />

        <FormField
          title='Sum'
          info='Add the cost or gain in numbers.'
          type='number'
          value={enteredSum}
          onChange={sumChangeHandler}
          onBlur={sumBlurHandler}
          error={sumInputInvalid ? sumInputInvalid : undefined}
          valid={sumIsValid ? sumIsValid : undefined}
        />

        <FormField
          title='Date'
          info='Pick a date.'
          type='date'
          value={enteredDate}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          error={dateInputInvalid ? dateInputInvalid : undefined}
          valid={dateIsValid ? dateIsValid : undefined}
        />

        <FormField
          title='Category'
          info='Choose or create a category.'
          type='select'
          options={categoryOpts}
          value={enteredCategory}
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          error={categoryInputInvalid ? categoryInputInvalid : undefined}
          valid={categoryIsValid ? categoryIsValid : undefined}
        />

        <FormField
          title='Notes'
          info='Add additional information.'
          type='textarea'
          value={enteredNotes}
          onChange={notesChangeHandler}
          onBlur={notesBlurHandler}
          error={notesInputInvalid ? notesInputInvalid : undefined}
          valid={notesIsValid ? notesIsValid : undefined}
        />
        <div className={styles.actions}>
          <ButtonAlt onClick={resetHandler}>CLEAR</ButtonAlt>
          <Button disabled={!formIsValid} onClick={submitHandler}>
            ADD
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
