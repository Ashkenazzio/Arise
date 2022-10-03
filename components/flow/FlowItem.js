import { useCurrency } from 'context/CurrencyContext';
import styles from './FlowItem.module.css';

import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';
import { useEffect, useLayoutEffect, useState } from 'react';
import useInput from 'hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';

const FlowItem = (props) => {
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

  const [currency] = useCurrency();

  const [edit, setEdit] = props.openState;

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
  } = useInput(isNotEmpty);

  useEffect(() => {
    const derivedState = { type: 'update-input', value: '', payload: null };

    const derivedTitle = { ...derivedState, value: props.title };
    const derivedSum = { ...derivedState, value: props.sum.toString() };
    const derivedDate = { ...derivedState, value: props.date };
    const derivedCategory = {
      type: 'update-category',
      value: props.category.id,
      payload: props.category,
    };
    const derivedNotes = {
      ...derivedState,
      value: props.notes ? props.notes : '',
    };

    titleChangeHandler(derivedTitle);
    sumChangeHandler(derivedSum);
    dateChangeHandler(derivedDate);
    categoryChangeHandler(derivedCategory);
    notesChangeHandler(derivedNotes);
  }, []);

  console.log(props);

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

  const toggle = () => {
    if (edit === props.id) {
      return setEdit(null);
    }
    setEdit(props.id);
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const queryData = {
      title: enteredTitle.value,
      sum: +enteredSum.value,
      date: enteredDate.value,
      category: selectedCategory.payload,
      notes: enteredNotes.value,
    };

    const itemId = props.id;
    props.onUpdateItem(itemId, queryData);

    resetHandler();
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    const itemId = props.id;
    props.onDeleteItem(itemId);
  };

  return (
    <div
      className={`${styles.container} ${
        edit === props.id && styles.open
      } icon-before`}
      icon={props.icon}
      onClick={toggle}
    >
      <div className={styles.content}>
        {edit !== props.id && (
          <>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.sum}>
              {currency.value}
              {props.sum.toLocaleString()}
            </span>
          </>
        )}
        {edit === props.id && (
          <form className={styles.form} onClick={(e) => e.stopPropagation()}>
            <FormField
              title='Title'
              id='title'
              type='text'
              placeholder={props.title}
              value={enteredTitle.value}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              error={titleInputInvalid ? titleInputInvalid : undefined}
              valid={titleIsValid ? titleIsValid : undefined}
            />

            <FormField
              title='Sum'
              id='sum'
              type='number'
              placeholder={props.sum}
              value={enteredSum.value}
              onChange={sumChangeHandler}
              onBlur={sumBlurHandler}
              error={sumInputInvalid ? sumInputInvalid : undefined}
              valid={sumIsValid ? sumIsValid : undefined}
            />

            <FormField
              title='Date'
              id='date'
              type='date'
              placeholder={props.date}
              value={enteredDate.value}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              error={dateInputInvalid ? dateInputInvalid : undefined}
              valid={dateIsValid ? dateIsValid : undefined}
            />

            <FormField
              title='Category'
              id='category'
              type='select'
              placeholder={props.category.id}
              options={!checked ? expenseCategories : incomeCategories}
              value={selectedCategory.value}
              onChange={categoryChangeHandler}
              onBlur={categoryBlurHandler}
              error={categoryInputInvalid ? categoryInputInvalid : undefined}
              valid={categoryIsValid ? categoryIsValid : undefined}
              style={{ backgroundColor: 'var(--clr-light)' }}
            />

            <FormField
              title='Notes'
              id='notes'
              span='2'
              type='textarea'
              // placeholder={props.notes}
              value={enteredNotes.value}
              onChange={notesChangeHandler}
              onBlur={notesBlurHandler}
              error={notesInputInvalid ? notesInputInvalid : undefined}
              valid={notesIsValid ? notesIsValid : undefined}
            />

            <div className={styles.actions}>
              <ButtonAlt onClick={deleteHandler} btn='delete'>
                DELETE
              </ButtonAlt>
              <ButtonAlt onClick={resetHandler}>CLEAR</ButtonAlt>
              <Button disabled={!formIsValid} onClick={updateHandler}>
                EDIT
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FlowItem;
