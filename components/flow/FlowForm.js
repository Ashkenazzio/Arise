import { useEffect, useState } from 'react';
import useInput from 'hooks/use-input';
import AddCategory from '@/add/AddCategory';
import DeletePrompt from './DeletePrompt';

import styles from './FlowForm.module.css';
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import ButtonAlt from '@/ui/ButtonAlt';

const stringIsNotEmpty = (value) => value?.trim() !== '';
const numIsNotZero = (value) => value !== '' && value !== 0;
const positiveNumber = (value) => +value > 0;

const FlowForm = (props) => {
  const expenseCategories = props.categories.filter(
    (category) => category.type === 'expense'
  );
  const incomeCategories = props.categories.filter(
    (category) => category.type === 'income'
  );

  const [edit, setEdit] = props.openState;
  const [addCategory, setAddCategory] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const categoryModalHandler = () => {
    setAddCategory(!addCategory);
  };

  const deleteModalHandler = (e) => {
    e.preventDefault();

    setDeleteModal(!deleteModal);
  };

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

  useEffect(() => {
    const derivedState = { type: 'update-input', value: '', payload: null };

    const derivedTitle = { ...derivedState, value: props.title };
    const derivedSum = { ...derivedState, value: props.sum.toString() };
    const derivedDate = { ...derivedState, value: props.date };
    const derivedNotes = { ...derivedState, value: props.notes };
    const derivedCategory = {
      type: 'update-category',
      value: props.category.id.toString(),
      payload: props.category,
    };

    // console.log('derived', {
    //   derivedTitle,
    //   derivedSum,
    //   derivedDate,
    //   derivedNotes,
    //   derivedCategory,
    // });

    titleChangeHandler(derivedTitle);
    sumChangeHandler(derivedSum);
    dateChangeHandler(derivedDate);
    categoryChangeHandler(derivedCategory);
    notesChangeHandler(derivedNotes);
  }, []);

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

  const updateHandler = (e) => {
    e.preventDefault();

    const queryData = {
      title: enteredTitle.value,
      sum: +enteredSum.value,
      date: enteredDate.value,
      category: selectedCategory.payload,
      notes: enteredNotes.value,
    };

    console.log(queryData);

    const itemId = props.id;
    const list = props.list === 'Expenses' ? 'expenses' : 'incomes';
    props.onUpdateItem(itemId, list, queryData);

    setEdit(null);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    const list = props.list === 'Expenses' ? 'expenses' : 'incomes';
    props.onDeleteItem(props.id, list);
  };

  // console.log('entered', {
  //   enteredTitle,
  //   enteredSum,
  //   enteredDate,
  //   enteredNotes,
  //   selectedCategory,
  // });

  return (
    <form
      className={`${styles.form} ${props.className}`}
      onClick={(e) => e.stopPropagation()}
    >
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
        min='0'
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
        options={
          props.list === 'Expenses' ? expenseCategories : incomeCategories
        }
        value={selectedCategory.value}
        onChange={categoryChangeHandler}
        onBlur={categoryBlurHandler}
        error={categoryInputInvalid ? categoryInputInvalid : undefined}
        valid={categoryIsValid ? categoryIsValid : undefined}
        onAddCategory={categoryModalHandler}
        style={{ backgroundColor: 'var(--clr-light)' }}
      />

      <FormField
        title='Notes (Optional)'
        id='notes'
        span='2'
        type='textarea'
        placeholder={props.notes}
        value={enteredNotes.value}
        onChange={notesChangeHandler}
      />

      <div className={styles.actions}>
        <ButtonAlt onClick={deleteModalHandler} btn='delete'>
          DELETE
        </ButtonAlt>
        <ButtonAlt onClick={resetHandler}>CLEAR</ButtonAlt>
        <Button disabled={!formIsValid} onClick={updateHandler}>
          EDIT
        </Button>
      </div>

      {addCategory && (
        <AddCategory
          onClose={categoryModalHandler}
          onAddCategory={props.onAddCategory}
        />
      )}

      {deleteModal && (
        <DeletePrompt onClose={deleteModalHandler} onDelete={deleteHandler} />
      )}
    </form>
  );
};

export default FlowForm;
