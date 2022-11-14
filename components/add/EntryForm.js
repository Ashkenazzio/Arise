import { useState } from 'react';
import useInput from 'hooks/use-input';
import { motion } from 'framer-motion';

import styles from './EntryForm.module.css';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import FormField from '@/ui/FormField';
import AddCategory from './AddCategory';
import { entryFormVars, formFieldVars } from 'lib/framer-variants';

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
    <motion.div variants={entryFormVars} className={styles.view}>
      <h2 className={styles.heading}>Add a new entry</h2>
      <form className={styles.form}>
        <FormField
          title='Title'
          id='title'
          info='Choose a title.'
          type='text'
          maxLength='32'
          value={enteredTitle.value}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleInputInvalid ? 1 : undefined}
          valid={titleIsValid ? 1 : undefined}
          required
        />

        <FormField
          title='Expense/Income'
          id='list'
          info='Choose to add an expense or an income.'
          type='checkbox'
          onChange={() => {
            resetCategoryInput();
            setChecked(!checked);
          }}
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
          error={sumInputInvalid ? 1 : undefined}
          valid={sumIsValid ? 1 : undefined}
          required
        />

        <FormField
          title='Date'
          id='date'
          info='Pick a date.'
          type='date'
          value={enteredDate.value}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          error={dateInputInvalid ? 1 : undefined}
          valid={dateIsValid ? 1 : undefined}
          required
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
          error={categoryInputInvalid ? 1 : undefined}
          valid={categoryIsValid ? 1 : undefined}
          onAddCategory={categoryModalHandler}
          required
        />

        <FormField
          title='Notes'
          id='notes'
          info='Add additional information if you have any.'
          type='textarea'
          value={enteredNotes.value}
          onChange={notesChangeHandler}
        />
        <motion.div variants={formFieldVars} className={styles.actions}>
          <ButtonAlt onClick={resetHandler}>clear</ButtonAlt>
          <Button disabled={!formIsValid} onClick={submitHandler}>
            add
          </Button>
        </motion.div>
        {addCategory && (
          <AddCategory
            onClose={categoryModalHandler}
            onAddCategory={props.onAddCategory}
          />
        )}
      </form>
    </motion.div>
  );
};

export default EntryForm;
