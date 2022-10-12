import styles from './EntryForm.module.css';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

import { useState, useLayoutEffect } from 'react';
import useInput from 'hooks/use-input';
import AddCategory from './AddCategory';
import { useAuthUser } from 'context/AuthContext';

const stringIsNotEmpty = (value) => value?.trim() !== '';
const numIsNotZero = (value) => value !== '' && value !== 0;
const positiveNumber = (value) => +value > 0;

const EntryForm = (props) => {
  const [expenseCategories, setExpenseCategories] = useState([
    {
      id: 0,
      title: 'Choose a category...',
    },
    { id: 111, title: 'Eating Out' },
    { id: 112, title: 'Fun' },
    { id: 113, title: 'Groceries' },
    { id: 114, title: 'Insurance' },
    { id: 115, title: 'Pharma' },
    { id: 116, title: 'Transport' },
    { id: 117, title: 'Utilities' },
    { id: 118, title: 'Misc.' },
  ]);

  const [incomeCategories, setIncomeCategories] = useState([
    {
      id: 0,
      title: 'Choose a category...',
    },
    { id: 121, title: 'Salary' },
    { id: 122, title: 'Misc.' },
  ]);

  const [checked, setChecked] = useState(false);
  const [addCategory, setAddCategoty] = useState(false);
  const [authUser] = useAuthUser();

  const showModalHandler = () => {
    setAddCategoty(true);
  };

  const hideModalHandler = () => {
    setAddCategoty(false);
  };

  if (authUser) {
    console.log('set categories');
    // setExpenseCategories(...);
    // setIncomeCategories(...);
  }

  useLayoutEffect(() => {
    if (!authUser) {
      const localExpCategoriesJSON = localStorage.getItem('expense-categories');
      const localIncCategoriesJSON = localStorage.getItem('income-categories');

      if (localExpCategoriesJSON) {
        setExpenseCategories(JSON.parse(localExpCategoriesJSON));
      }

      if (localIncCategoriesJSON) {
        setIncomeCategories(JSON.parse(localIncCategoriesJSON));
      }
    }
  }, []);

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

    console.log(selectedCategory);

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
          onAddCategory={showModalHandler}
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
            onClose={hideModalHandler}
            expenseCategories={[expenseCategories, setExpenseCategories]}
            incomeCategories={[incomeCategories, setIncomeCategories]}
          />
        )}
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
