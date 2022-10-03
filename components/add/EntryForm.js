import styles from './EntryForm.module.css';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

import { useState } from 'react';
import useInput from 'hooks/use-input';

const isNotEmpty = (value) => value?.trim() !== '';
const positiveNumber = (value) => +value > 0;

const EntryForm = (props) => {
  const [expenseCategories, setExpenseCategories] = useState([
    {
      id: '0',
      title: 'Choose a category...',
      value: '',
    },
    { id: 'ex1', title: 'Eating Out', value: 'eating-out' },
    { id: 'ex2', title: 'Fun', value: 'fun' },
    { id: 'ex3', title: 'Groceries', value: 'groceries' },
    { id: 'ex4', title: 'Insurance', value: 'insurance' },
    { id: 'ex5', title: 'Pharma', value: 'pharma' },
    { id: 'ex6', title: 'Transport', value: 'transport' },
    { id: 'ex7', title: 'Utilities', value: 'utilities' },
    { id: 'ex8', title: 'Misc.', value: 'miscellaneous' },
  ]);

  const [incomeCategories, setIncomeCategories] = useState([
    {
      id: '0',
      title: 'Choose a category...',
      value: '',
    },
    { id: 'in1', title: 'Salary', value: 'salary' },
    { id: 'in2', title: 'Misc.', value: 'miscellaneous' },
  ]);

  const [checked, setChecked] = useState(false);

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
  } = useInput(positiveNumber);

  const {
    value: enteredDate,
    isValid: dateIsValid,
    hasError: dateInputInvalid,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput(isNotEmpty);

  const {
    value: selectedCategory,
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
  } = useInput(() => true);

  let formIsValid = false;

  if (titleIsValid && sumIsValid && dateIsValid && categoryIsValid) {
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
      title: enteredTitle.value,
      sum: +enteredSum.value,
      date: enteredDate.value,
      category: selectedCategory.payload,
      notes: enteredNotes.value,
    };

    const enteredList = checked ? 'incomes' : 'expenses';

    resetHandler();
    props.onAddItem(queryData, enteredList);
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
          info='Choose to add an expense or income.'
          type='checkbox'
          onChange={() => setChecked(!checked)}
        />

        <FormField
          title='Sum'
          id='sum'
          info='Add the cost or gain in numbers.'
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
        />

        <FormField
          title='Notes (Optional)'
          id='notes'
          info='Add additional information if you have any.'
          type='textarea'
          value={enteredNotes.value}
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

// { key: 'c1', name: '🍴 Eating Out', value: 'eating-out' },
// { key: 'c2', name: '😊 Fun', value: 'fun' },
// { key: 'c3', name: '🛒 Groceries', value: 'groceries' },
// { key: 'c4', name: '📃 Insurance', value: 'insurance' },
// { key: 'c5', name: '💊 Pharma', value: 'pharma' },
// { key: 'c6', name: '🚌 Transport', value: 'transport' },
// { key: 'c7', name: '⚡ Utilities', value: 'utilities' },
// { key: 'c8', name: '♾ Misc.', value: 'miscellaneous' },
